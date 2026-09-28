import { useState, type FormEvent } from 'react'
import { chatModel } from '@/entities/chat'
import { formatPhone, isValidPhone, normalizePhone } from '@/shared/lib'
import { Button, CloseIcon, IconButton, Input } from '@/shared/ui'

interface CreateChatFormProps {
  onClose: () => void
}

export const CreateChatForm = ({ onClose }: CreateChatFormProps) => {
  const [value, setValue] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const phone = normalizePhone(value)

    if (!isValidPhone(phone)) {
      setError('Введите номер в международном формате, например +7 999 123-45-67')
      return
    }

    const { chats } = chatModel.getState()
    const existing = chats.find((chat) => chat.phone === phone)

    if (!existing) {
      chatModel.addChat({
        id: `phone:${phone}`,
        chatId: `${phone}@c.us`,
        phone,
        name: formatPhone(phone),
        unread: 0,
        updatedAt: Date.now(),
      })
    }

    chatModel.setActiveChat(existing?.id ?? `phone:${phone}`)
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 rounded-2xl bg-surface-muted p-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-text">Новый чат</span>
        <IconButton label="Закрыть" onClick={onClose} className="size-8">
          <CloseIcon width={16} height={16} />
        </IconButton>
      </div>
      <Input
        autoFocus
        type="tel"
        inputMode="tel"
        placeholder="+7 999 123-45-67"
        value={value}
        onChange={(event) => {
          setValue(event.target.value)
          setError(null)
        }}
        className="bg-surface"
      />
      {error && <p className="text-xs text-danger">{error}</p>}
      <Button type="submit" disabled={!value.trim()}>
        Создать чат
      </Button>
    </form>
  )
}
