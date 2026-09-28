import { useChatStore } from '@/entities/chat'
import { useReceiveNotifications } from '@/features/receive-messages'
import { cn } from '@/shared/lib'
import { ChatSidebar } from '@/widgets/chat-sidebar'
import { ChatWindow } from '@/widgets/chat-window'

export const ChatPage = () => {
  const status = useReceiveNotifications()
  const hasActiveChat = useChatStore((state) => state.activeChatId !== null)

  return (
    <div className="flex h-dvh overflow-hidden">
      <ChatSidebar
        status={status}
        className={cn('w-full md:w-90 md:shrink-0', hasActiveChat && 'hidden md:flex')}
      />
      <ChatWindow className={cn('flex-1', !hasActiveChat && 'hidden md:flex')} />
    </div>
  )
}
