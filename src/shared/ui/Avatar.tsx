import { cn } from '@/shared/lib'

const GRADIENTS = [
  'from-sky-400 to-blue-500',
  'from-violet-400 to-purple-500',
  'from-pink-400 to-rose-500',
  'from-amber-400 to-orange-500',
  'from-emerald-400 to-green-500',
  'from-cyan-400 to-teal-500',
]

const hash = (value: string) => [...value].reduce((acc, char) => acc + char.charCodeAt(0), 0)

const getInitials = (name: string) => {
  const words = name.replace(/[^\p{L}\p{N}\s]/gu, '').trim().split(/\s+/)
  return words.slice(0, 2).map((word) => word.charAt(0).toUpperCase()).join('') || '?'
}

interface AvatarProps {
  name: string
  size?: 'md' | 'lg'
  className?: string
}

export const Avatar = ({ name, size = 'lg', className }: AvatarProps) => (
  <div
    aria-hidden
    className={cn(
      'flex shrink-0 select-none items-center justify-center rounded-full bg-linear-to-br font-semibold text-white',
      GRADIENTS[hash(name) % GRADIENTS.length],
      size === 'lg' ? 'size-12 text-base' : 'size-10 text-sm',
      className,
    )}
  >
    {getInitials(name)}
  </div>
)
