import { useId, type InputHTMLAttributes } from 'react'
import { cn } from '@/shared/lib'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  hint?: string
}

export const Input = ({ label, hint, className, id, ...props }: InputProps) => {
  const generatedId = useId()
  const inputId = id ?? generatedId

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-text-secondary">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          'h-11 rounded-xl border border-transparent bg-surface-muted px-3.5 text-sm text-text outline-none transition-colors placeholder:text-text-muted focus:border-accent focus:bg-surface',
          className,
        )}
        {...props}
      />
      {hint && <span className="text-xs text-text-muted">{hint}</span>}
    </div>
  )
}
