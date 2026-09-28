import { cn, formatTime } from '@/shared/lib'
import { AlertIcon, CheckIcon, ClockIcon } from '@/shared/ui'
import type { Message } from '../model/types'

const StatusIcon = ({ status }: Pick<Message, 'status'>) => {
  if (status === 'pending') return <ClockIcon width={14} height={14} />
  if (status === 'failed') return <AlertIcon width={14} height={14} className="text-danger" />
  return <CheckIcon width={14} height={14} />
}

export const MessageBubble = ({ message }: { message: Message }) => {
  const outgoing = message.direction === 'outgoing'

  return (
    <div className={cn('flex', outgoing ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          'max-w-[75%] rounded-2xl px-3 py-1.5 shadow-xs md:max-w-[60%]',
          outgoing ? 'rounded-br-md bg-bubble-out' : 'rounded-bl-md bg-bubble-in',
        )}
      >
        <p className="whitespace-pre-wrap break-words text-[15px] leading-snug text-text">
          {message.text}
        </p>
        <div className="mt-0.5 flex items-center justify-end gap-1 text-[11px] text-text-muted">
          {message.status === 'failed' && <span className="text-danger">Не отправлено</span>}
          <span>{formatTime(message.timestamp)}</span>
          {outgoing && <StatusIcon status={message.status} />}
        </div>
      </div>
    </div>
  )
}
