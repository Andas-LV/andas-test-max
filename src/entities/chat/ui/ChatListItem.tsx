import type { ReactNode } from 'react'
import { cn, formatShortDate } from '@/shared/lib'
import { Avatar } from '@/shared/ui'
import type { Chat } from '../model/types'

interface ChatListItemProps {
  chat: Chat
  preview?: ReactNode
  active: boolean
  onClick: () => void
}

export const ChatListItem = ({ chat, preview, active, onClick }: ChatListItemProps) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      'flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors',
      active ? 'bg-accent-soft' : 'hover:bg-surface-hover',
    )}
  >
    <Avatar name={chat.name} />
    <div className="min-w-0 flex-1">
      <div className="flex items-baseline justify-between gap-2">
        <span className="truncate font-medium text-text">{chat.name}</span>
        <span className="shrink-0 text-xs text-text-muted">{formatShortDate(chat.updatedAt)}</span>
      </div>
      <div className="mt-0.5 flex items-center justify-between gap-2">
        <span className="truncate text-sm text-text-secondary">{preview}</span>
        {chat.unread > 0 && (
          <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-accent px-1.5 text-xs font-medium text-white">
            {chat.unread}
          </span>
        )}
      </div>
    </div>
  </button>
)
