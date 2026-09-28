import axios from 'axios'
import { useEffect, useState } from 'react'
import { useCredentials } from '@/entities/session'
import { greenApi } from '@/shared/api'
import { delay } from '@/shared/lib'
import { handleNotification } from '../lib/handleNotification'

export type ConnectionStatus = 'connecting' | 'online' | 'offline'

const RECEIVE_TIMEOUT_SEC = 20
const RETRY_DELAY_MS = 3000

/** Long polling очереди уведомлений GREEN-API: receiveNotification → обработка → deleteNotification */
export const useReceiveNotifications = () => {
  const credentials = useCredentials()
  const [status, setStatus] = useState<ConnectionStatus>('connecting')

  useEffect(() => {
    if (!credentials) return

    const controller = new AbortController()
    const { signal } = controller

    const poll = async () => {
      while (!signal.aborted) {
        try {
          const notification = await greenApi.receiveNotification(credentials, {
            receiveTimeout: RECEIVE_TIMEOUT_SEC,
            signal,
          })
          setStatus('online')
          if (!notification) continue

          try {
            handleNotification(notification.body)
          } catch (error) {
            console.error('Не удалось обработать уведомление', error)
          }
          await greenApi.deleteNotification(credentials, notification.receiptId, signal)
        } catch (error) {
          if (axios.isCancel(error) || signal.aborted) return
          setStatus('offline')
          await delay(RETRY_DELAY_MS, signal)
        }
      }
    }

    void poll()
    return () => controller.abort()
  }, [credentials])

  return status
}
