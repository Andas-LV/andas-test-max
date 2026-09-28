import { createLocalQuery } from '@/shared/api'
import type { Chat } from './types'

interface ChatState {
  chats: Chat[]
  activeChatId: string | null
}

const chatsQuery = createLocalQuery<ChatState>(['chats'], 'max-chat/chats', {
  chats: [],
  activeChatId: null,
})

export const chatModel = {
  getState: chatsQuery.get,

  addChat: (chat: Chat) =>
    chatsQuery.update((state) =>
      state.chats.some((item) => item.id === chat.id) ? state : { ...state, chats: [...state.chats, chat] },
    ),

  updateChat: (id: string, patch: Partial<Omit<Chat, 'id'>>) =>
    chatsQuery.update((state) => ({
      ...state,
      chats: state.chats.map((chat) => (chat.id === id ? { ...chat, ...patch } : chat)),
    })),

  setActiveChat: (id: string | null) =>
    chatsQuery.update((state) => ({
      activeChatId: id,
      chats: state.chats.map((chat) => (chat.id === id ? { ...chat, unread: 0 } : chat)),
    })),

  reset: chatsQuery.reset,
}

export const useChats = () => chatsQuery.useSelect((state) => state.chats)

export const useActiveChatId = () => chatsQuery.useSelect((state) => state.activeChatId)

export const useActiveChat = () =>
  chatsQuery.useSelect(
    (state) => state.chats.find((chat) => chat.id === state.activeChatId) ?? null,
  )
