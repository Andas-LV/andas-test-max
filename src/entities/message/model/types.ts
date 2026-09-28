export type MessageDirection = 'incoming' | 'outgoing'

export type MessageStatus = 'pending' | 'sent' | 'failed'

export interface Message {
  /** idMessage из GREEN-API или временный локальный id до подтверждения */
  id: string
  /** Локальный ключ чата (Chat.id) */
  chatKey: string
  text: string
  timestamp: number
  direction: MessageDirection
  status: MessageStatus
}
