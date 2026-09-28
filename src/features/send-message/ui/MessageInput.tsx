import { useRef, useState, type FormEvent, type KeyboardEvent } from 'react'
import type { Chat } from '@/entities/chat'
import { cn } from '@/shared/lib'
import { SendIcon } from '@/shared/ui'
import { useSendMessage } from '../model/useSendMessage'

const MAX_LENGTH = 4000

export const MessageInput = ({ chat }: { chat: Chat }) => {
  const [text, setText] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const sendMessage = useSendMessage()

  const trimmed = text.trim()

  const resize = () => {
    const textarea = textareaRef.current
    if (!textarea) return
    textarea.style.height = 'auto'
    textarea.style.height = `${Math.min(textarea.scrollHeight, 160)}px`
  }

  const submit = () => {
    if (!trimmed) return
    void sendMessage(chat, trimmed)
    setText('')
    requestAnimationFrame(resize)
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    submit()
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault()
      submit()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-2 px-4 pb-4 pt-2">
      <textarea
        ref={textareaRef}
        rows={1}
        value={text}
        maxLength={MAX_LENGTH}
        placeholder="Сообщение"
        onChange={(event) => {
          setText(event.target.value)
          resize()
        }}
        onKeyDown={handleKeyDown}
        className="max-h-40 min-h-11 flex-1 resize-none rounded-3xl bg-surface px-4 py-2.5 text-[15px] leading-6 text-text shadow-xs outline-none placeholder:text-text-muted"
      />
      <button
        type="submit"
        aria-label="Отправить"
        disabled={!trimmed}
        className={cn(
          'flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-accent text-white transition-all hover:bg-accent-hover',
          !trimmed && 'pointer-events-none scale-90 opacity-0',
        )}
      >
        <SendIcon />
      </button>
    </form>
  )
}
