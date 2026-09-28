import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { GreenApiCredentials } from '@/shared/api'

interface SessionState {
  credentials: GreenApiCredentials | null
  setCredentials: (credentials: GreenApiCredentials) => void
  clear: () => void
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      credentials: null,
      setCredentials: (credentials) => set({ credentials }),
      clear: () => set({ credentials: null }),
    }),
    { name: 'max-chat:session' },
  ),
)

export const useCredentials = () => useSessionStore((state) => state.credentials)
