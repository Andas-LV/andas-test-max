import { useMemo, useState } from 'react'
import { ChatListItem, useChatStore, type Chat } from '@/entities/chat'
import { useLastMessage } from '@/entities/message'
import { LogoutButton } from '@/features/auth'
import { CreateChatForm } from '@/features/create-chat'
import type { ConnectionStatus } from '@/features/receive-messages'
import { cn } from '@/shared/lib'
import { ChatBubbleIcon, IconButton, PlusIcon } from '@/shared/ui'

const STATUS_LABEL: Record<ConnectionStatus, string> = {
  connecting: 'Подключение…',
  online: 'В сети',
  offline: 'Нет соединения',
}

const ChatPreview = ({ chat }: { chat: Chat }) => {
  const lastMessage = useLastMessage(chat.id)
  if (!lastMessage) return <span className="text-text-muted">Нет сообщений</span>
  return (
    <>
      {lastMessage.direction === 'outgoing' && <span className="text-text">Вы: </span>}
      {lastMessage.text}
    </>
  )
}

interface ChatSidebarProps {
  status: ConnectionStatus
  className?: string
}

export const ChatSidebar = ({ status, className }: ChatSidebarProps) => {
  const chats = useChatStore((state) => state.chats)
  const activeChatId = useChatStore((state) => state.activeChatId)
  const setActiveChat = useChatStore((state) => state.setActiveChat)
  const [isCreating, setIsCreating] = useState(false)

  const sortedChats = useMemo(() => [...chats].sort((a, b) => b.updatedAt - a.updatedAt), [chats])

  return (
    <aside className={cn('flex flex-col border-r border-border bg-surface', className)}>
      <header className="flex items-center justify-between gap-2 px-4 pb-2 pt-4">
        <div>
          <h1 className="text-xl font-semibold text-text">Чаты</h1>
          <div className="flex items-center gap-1.5 text-xs text-text-muted">
            <span
              className={cn(
                'size-2 rounded-full',
                status === 'online' && 'bg-success',
                status === 'connecting' && 'animate-pulse bg-warning',
                status === 'offline' && 'bg-danger',
              )}
            />
            {STATUS_LABEL[status]}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <IconButton label="Новый чат" onClick={() => setIsCreating((value) => !value)}>
            <PlusIcon />
          </IconButton>
          <LogoutButton />
        </div>
      </header>

      {isCreating && (
        <div className="px-3 pb-2">
          <CreateChatForm onClose={() => setIsCreating(false)} />
        </div>
      )}

      <nav className="flex-1 overflow-y-auto px-2 pb-2">
        {sortedChats.length === 0 ? (
          <div className="flex flex-col items-center gap-3 px-6 py-16 text-center text-sm text-text-muted">
            <ChatBubbleIcon width={40} height={40} className="text-accent/40" />
            <p>Чатов пока нет. Нажмите «+», чтобы написать по номеру телефона</p>
          </div>
        ) : (
          sortedChats.map((chat) => (
            <ChatListItem
              key={chat.id}
              chat={chat}
              active={chat.id === activeChatId}
              preview={<ChatPreview chat={chat} />}
              onClick={() => setActiveChat(chat.id)}
            />
          ))
        )}
      </nav>
    </aside>
  )
}
