import { chatModel, useActiveChat } from '@/entities/chat'
import { MessageInput } from '@/features/send-message'
import { cn, formatPhone } from '@/shared/lib'
import { ArrowLeftIcon, Avatar, ChatBubbleIcon, IconButton } from '@/shared/ui'
import { MessageList } from './MessageList'

export const ChatWindow = ({ className }: { className?: string }) => {
  const chat = useActiveChat()

  if (!chat) {
    return (
      <section className={cn('flex flex-col items-center justify-center gap-3 bg-chat', className)}>
        <ChatBubbleIcon width={48} height={48} className="text-accent/40" />
        <p className="rounded-full bg-surface/70 px-4 py-2 text-sm text-text-secondary">
          Выберите чат или создайте новый
        </p>
      </section>
    )
  }

  const subtitle = chat.phone ? formatPhone(chat.phone) : 'MAX'

  return (
    <section className={cn('flex min-w-0 flex-col bg-chat', className)}>
      <header className="flex h-16 shrink-0 items-center gap-3 border-b border-border bg-surface px-3 md:px-5">
        <IconButton label="Назад" onClick={() => chatModel.setActiveChat(null)} className="md:hidden">
          <ArrowLeftIcon />
        </IconButton>
        <Avatar name={chat.name} size="md" />
        <div className="min-w-0">
          <h2 className="truncate font-medium text-text">{chat.name}</h2>
          {subtitle !== chat.name && <p className="truncate text-xs text-text-muted">{subtitle}</p>}
        </div>
      </header>

      <MessageList chatKey={chat.id} />
      <MessageInput key={chat.id} chat={chat} />
    </section>
  )
}
