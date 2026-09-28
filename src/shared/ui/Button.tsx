import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/shared/lib'

type ButtonVariant = 'primary' | 'ghost'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
}

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-white hover:bg-accent-hover disabled:opacity-50',
  ghost: 'bg-transparent text-text-secondary hover:bg-surface-hover',
}

export const Button = ({ variant = 'primary', className, type = 'button', ...props }: ButtonProps) => (
  <button
    type={type}
    className={cn(
      'inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl px-4 text-sm font-medium transition-colors disabled:cursor-not-allowed',
      variants[variant],
      className,
    )}
    {...props}
  />
)
