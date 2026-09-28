export interface Chat {
  /** Локальный ключ чата */
  id: string
  /** chatId для отправки через GREEN-API: `79991234567@c.us` или числовой id MAX */
  chatId: string
  /** Номер телефона собеседника (если известен) */
  phone?: string
  /** Числовой id собеседника в MAX — приходит во входящих уведомлениях */
  maxId?: string
  name: string
  unread: number
  updatedAt: number
}
