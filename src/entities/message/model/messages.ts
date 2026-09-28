import { createLocalQuery } from '@/shared/api'
import type { Message } from './types'

const EMPTY: Message[] = []

type MessagesByChat = Record<string, Message[]>

const messagesQuery = createLocalQuery<MessagesByChat>(['messages'], 'max-chat/messages', {})

export const messageModel = {
  addMessage: (message: Message) =>
    messagesQuery.update((byChat) => {
      const list = byChat[message.chatKey] ?? EMPTY
      if (list.some((item) => item.id === message.id)) return byChat
      const next = [...list, message].sort((a, b) => a.timestamp - b.timestamp)
      return { ...byChat, [message.chatKey]: next }
    }),

  updateMessage: (chatKey: string, id: string, patch: Partial<Message>) =>
    messagesQuery.update((byChat) => ({
      ...byChat,
      [chatKey]: (byChat[chatKey] ?? EMPTY).map((message) =>
        message.id === id ? { ...message, ...patch } : message,
      ),
    })),

  removeMessage: (chatKey: string, id: string) =>
    messagesQuery.update((byChat) => ({
      ...byChat,
      [chatKey]: (byChat[chatKey] ?? EMPTY).filter((message) => message.id !== id),
    })),

  findMessage: (predicate: (message: Message) => boolean) =>
    Object.values(messagesQuery.get()).flat().find(predicate),

  reset: messagesQuery.reset,
}

export const useChatMessages = (chatKey: string | null) =>
  messagesQuery.useSelect((byChat) => (chatKey ? (byChat[chatKey] ?? EMPTY) : EMPTY))

export const useLastMessage = (chatKey: string) =>
  messagesQuery.useSelect((byChat) => byChat[chatKey]?.at(-1))
