import type { InstanceState } from '@/shared/api'

export class InstanceStateError extends Error {
  readonly state: InstanceState

  constructor(state: InstanceState) {
    super(`Instance state: ${state}`)
    this.name = 'InstanceStateError'
    this.state = state
  }
}

export const INSTANCE_STATE_MESSAGES: Record<
  Exclude<InstanceState, 'authorized'>,
  { title: string; description: string }
> = {
  notAuthorized: {
    title: 'Инстанс не авторизован',
    description:
      'Аккаунт MAX не привязан к инстансу. Откройте личный кабинет GREEN-API, авторизуйте инстанс и попробуйте снова.',
  },
  blocked: {
    title: 'Аккаунт заблокирован',
    description: 'Аккаунт MAX, привязанный к инстансу, заблокирован.',
  },
  sleepMode: {
    title: 'Инстанс в спящем режиме',
    description: 'Телефон с аккаунтом MAX недоступен. Проверьте подключение и повторите попытку.',
  },
  starting: {
    title: 'Инстанс запускается',
    description: 'Подождите пару минут и попробуйте снова.',
  },
  yellowCard: {
    title: 'Отправка приостановлена',
    description:
      'У аккаунта обнаружена подозрительная активность, отправка сообщений временно ограничена.',
  },
}
