import { createLocalQuery, type GreenApiCredentials } from '@/shared/api'

const sessionQuery = createLocalQuery<GreenApiCredentials | null>(
  ['session'],
  'max-chat/session',
  null,
)

export const sessionModel = {
  getCredentials: sessionQuery.get,
  setCredentials: (credentials: GreenApiCredentials) => sessionQuery.set(credentials),
  clear: sessionQuery.reset,
}

export const useCredentials = () => sessionQuery.useSelect()
