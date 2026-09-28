import { useCallback } from 'react'
import { chatModel, type Chat } from '@/entities/chat'
import { messageModel } from '@/entities/message'
import { useCredentials } from '@/entities/session'
import { greenApi } from '@/shared/api'

const createLocalId = () => `local-${Date.now()}-${Math.random().toString(36).slice(2)}`

export const useSendMessage = () => {
  const credentials = useCredentials()

  return useCallback(
    async (chat: Chat, text: string) => {
      if (!credentials) return

      const { addMessage, updateMessage, removeMessage, findMessage } = messageModel
      const localId = createLocalId()
      const timestamp = Date.now()

      addMessage({
        id: localId,
        chatKey: chat.id,
        text,
        timestamp,
        direction: 'outgoing',
        status: 'pending',
      })
      chatModel.updateChat(chat.id, { updatedAt: timestamp })

      try {
        const { idMessage } = await greenApi.sendMessage(credentials, {
          chatId: chat.chatId,
          message: text,
        })
        if (findMessage((message) => message.id === idMessage)) {
          removeMessage(chat.id, localId)
        } else {
          updateMessage(chat.id, localId, { id: idMessage, status: 'sent' })
        }
      } catch {
        updateMessage(chat.id, localId, { status: 'failed' })
      }
    },
    [credentials],
  )
}
