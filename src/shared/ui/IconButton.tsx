import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/shared/lib'

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
}

export const IconButton = ({ label, className, type = 'button', ...props }: IconButtonProps) => (
  <button
    type={type}
    aria-label={label}
    title={label}
    className={cn(
      'inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-surface-hover disabled:cursor-not-allowed disabled:opacity-50',
      className,
    )}
    {...props}
  />
)
