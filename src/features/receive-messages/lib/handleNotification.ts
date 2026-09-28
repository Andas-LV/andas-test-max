import { chatModel, type Chat } from '@/entities/chat'
import { messageModel, type MessageDirection } from '@/entities/message'
import type { MessageData, NotificationBody, SenderData } from '@/shared/api'
import { formatPhone } from '@/shared/lib'

const MESSAGE_WEBHOOKS: Record<string, MessageDirection> = {
  incomingMessageReceived: 'incoming',
  outgoingMessageReceived: 'outgoing',
  outgoingAPIMessageReceived: 'outgoing',
}

const extractText = (data?: MessageData) => {
  if (data?.typeMessage === 'textMessage') return data.textMessageData?.textMessage ?? null
  if (data?.typeMessage === 'extendedTextMessage') return data.extendedTextMessageData?.text ?? null
  return null
}

const linkMaxId = (chatKey: string, maxId: string) => {
  const { chats } = chatModel.getState()
  const chat = chats.find((item) => item.id === chatKey)
  if (chat && !chat.maxId) chatModel.updateChat(chat.id, { maxId })
}

const resolveChat = (sender: SenderData, direction: MessageDirection): Chat => {
  const { chats } = chatModel.getState()
  const phone =
    direction === 'incoming' && sender.senderPhoneNumber ? String(sender.senderPhoneNumber) : undefined
  const name =
    direction === 'incoming'
      ? sender.senderContactName || sender.senderName || sender.chatName
      : sender.chatName

  const existing = chats.find(
    (chat) =>
      chat.maxId === sender.chatId ||
      chat.chatId === sender.chatId ||
      (phone !== undefined && chat.phone === phone),
  )

  if (existing) {
    const patch: Partial<Chat> = {}
    if (!existing.maxId) patch.maxId = sender.chatId
    if (!existing.phone && phone) patch.phone = phone
    if (name && existing.phone && existing.name === formatPhone(existing.phone)) patch.name = name
    if (Object.keys(patch).length) chatModel.updateChat(existing.id, patch)
    return { ...existing, ...patch }
  }

  const chat: Chat = {
    id: `max:${sender.chatId}`,
    chatId: sender.chatId,
    maxId: sender.chatId,
    phone,
    name: name || (phone ? formatPhone(phone) : sender.chatId),
    unread: 0,
    updatedAt: Date.now(),
  }
  chatModel.addChat(chat)
  return chat
}

export const handleNotification = (body: NotificationBody) => {
  const direction = MESSAGE_WEBHOOKS[body.typeWebhook]
  const text = extractText(body.messageData)
  const { idMessage, senderData } = body
  if (!direction || text === null || !idMessage || !senderData) return

  const { findMessage } = messageModel

  const known =
    findMessage((message) => message.id === idMessage) ??
    (body.typeWebhook === 'outgoingAPIMessageReceived'
      ? findMessage((message) => message.status === 'pending' && message.text === text)
      : undefined)

  if (known) {
    linkMaxId(known.chatKey, senderData.chatId)
    return
  }

  const chat = resolveChat(senderData, direction)
  const timestamp = body.timestamp * 1000
  const { activeChatId } = chatModel.getState()

  messageModel.addMessage({
    id: idMessage,
    chatKey: chat.id,
    text,
    timestamp,
    direction,
    status: 'sent',
  })
  chatModel.updateChat(chat.id, {
    updatedAt: Math.max(chat.updatedAt, timestamp),
    unread:
      direction === 'incoming' && activeChatId !== chat.id ? chat.unread + 1 : chat.unread,
  })
}
