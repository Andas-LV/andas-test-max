import type { ReactNode } from 'react'
import { cn } from '@/shared/lib'
import { AlertIcon } from './icons'

interface AlertProps {
  title: string
  children?: ReactNode
  className?: string
}

export const Alert = ({ title, children, className }: AlertProps) => (
  <div role="alert" className={cn('flex gap-3 rounded-xl bg-danger/10 px-3.5 py-3 text-sm', className)}>
    <AlertIcon className="mt-0.5 shrink-0 text-danger" />
    <div className="flex flex-col gap-1">
      <p className="font-medium text-danger">{title}</p>
      {children && <div className="text-text-secondary">{children}</div>}
    </div>
  </div>
)
