import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Message } from './types'

const EMPTY: Message[] = []

interface MessageState {
  byChat: Record<string, Message[]>
  addMessage: (message: Message) => void
  updateMessage: (chatKey: string, id: string, patch: Partial<Message>) => void
  removeMessage: (chatKey: string, id: string) => void
  findMessage: (predicate: (message: Message) => boolean) => Message | undefined
  reset: () => void
}

export const useMessageStore = create<MessageState>()(
  persist(
    (set, get) => ({
      byChat: {},

      addMessage: (message) =>
        set((state) => {
          const list = state.byChat[message.chatKey] ?? EMPTY
          if (list.some((item) => item.id === message.id)) return state
          const next = [...list, message].sort((a, b) => a.timestamp - b.timestamp)
          return { byChat: { ...state.byChat, [message.chatKey]: next } }
        }),

      updateMessage: (chatKey, id, patch) =>
        set((state) => ({
          byChat: {
            ...state.byChat,
            [chatKey]: (state.byChat[chatKey] ?? EMPTY).map((message) =>
              message.id === id ? { ...message, ...patch } : message,
            ),
          },
        })),

      removeMessage: (chatKey, id) =>
        set((state) => ({
          byChat: {
            ...state.byChat,
            [chatKey]: (state.byChat[chatKey] ?? EMPTY).filter((message) => message.id !== id),
          },
        })),

      findMessage: (predicate) => Object.values(get().byChat).flat().find(predicate),

      reset: () => set({ byChat: {} }),
    }),
    { name: 'max-chat:messages' },
  ),
)

export const useChatMessages = (chatKey: string | null) =>
  useMessageStore((state) => (chatKey ? (state.byChat[chatKey] ?? EMPTY) : EMPTY))

export const useLastMessage = (chatKey: string) =>
  useMessageStore((state) => state.byChat[chatKey]?.at(-1))
