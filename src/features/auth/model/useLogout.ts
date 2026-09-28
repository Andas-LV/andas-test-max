import { useCallback } from 'react'
import { chatModel } from '@/entities/chat'
import { messageModel } from '@/entities/message'
import { sessionModel } from '@/entities/session'

export const useLogout = () =>
  useCallback(() => {
    sessionModel.clear()
    chatModel.reset()
    messageModel.reset()
  }, [])
