import { useCallback } from 'react'
import { useChatStore } from '@/entities/chat'
import { useMessageStore } from '@/entities/message'
import { useSessionStore } from '@/entities/session'

export const useLogout = () =>
  useCallback(() => {
    useSessionStore.getState().clear()
    useChatStore.getState().reset()
    useMessageStore.getState().reset()
  }, [])
