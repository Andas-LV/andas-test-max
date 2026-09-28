import { Fragment, useEffect, useRef } from 'react'
import { MessageBubble, useChatMessages } from '@/entities/message'
import { formatDayLabel, isSameDayTimestamp } from '@/shared/lib'

export const MessageList = ({ chatKey }: { chatKey: string }) => {
  const messages = useChatMessages(chatKey)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: 'end' })
  }, [messages.length, chatKey])

  if (messages.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center p-6">
        <p className="rounded-full bg-surface/70 px-4 py-2 text-sm text-text-secondary">
          Напишите первое сообщение
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col gap-1.5 overflow-y-auto px-4 py-4 md:px-8">
      {messages.map((message, index) => {
        const previous = messages[index - 1]
        const showDay = !previous || !isSameDayTimestamp(previous.timestamp, message.timestamp)

        return (
          <Fragment key={message.id}>
            {showDay && (
              <div className="sticky top-0 my-2 flex justify-center">
                <span className="rounded-full bg-surface/80 px-3 py-1 text-xs text-text-secondary backdrop-blur">
                  {formatDayLabel(message.timestamp)}
                </span>
              </div>
            )}
            <MessageBubble message={message} />
          </Fragment>
        )
      })}
      <div ref={bottomRef} />
    </div>
  )
}
