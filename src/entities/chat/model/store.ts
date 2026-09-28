import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Chat } from './types'

interface ChatState {
  chats: Chat[]
  activeChatId: string | null
  addChat: (chat: Chat) => void
  updateChat: (id: string, patch: Partial<Omit<Chat, 'id'>>) => void
  setActiveChat: (id: string | null) => void
  reset: () => void
}

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      chats: [],
      activeChatId: null,

      addChat: (chat) =>
        set((state) =>
          state.chats.some((item) => item.id === chat.id) ? state : { chats: [...state.chats, chat] },
        ),

      updateChat: (id, patch) =>
        set((state) => ({
          chats: state.chats.map((chat) => (chat.id === id ? { ...chat, ...patch } : chat)),
        })),

      setActiveChat: (id) =>
        set((state) => ({
          activeChatId: id,
          chats: state.chats.map((chat) => (chat.id === id ? { ...chat, unread: 0 } : chat)),
        })),

      reset: () => set({ chats: [], activeChatId: null }),
    }),
    { name: 'max-chat:chats' },
  ),
)

export const useActiveChat = () =>
  useChatStore((state) => state.chats.find((chat) => chat.id === state.activeChatId) ?? null)
