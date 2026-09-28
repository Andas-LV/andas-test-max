const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()

export const isSameDayTimestamp = (a: number, b: number) => isSameDay(new Date(a), new Date(b))

export const formatTime = (timestamp: number) =>
  new Date(timestamp).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })

/** Время для списка чатов: сегодня — часы, иначе — дата */
export const formatShortDate = (timestamp: number) =>
  isSameDayTimestamp(timestamp, Date.now())
    ? formatTime(timestamp)
    : new Date(timestamp).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' })

export const formatDayLabel = (timestamp: number) => {
  const now = new Date()
  const yesterday = new Date(now)
  yesterday.setDate(now.getDate() - 1)

  if (isSameDayTimestamp(timestamp, now.getTime())) return 'Сегодня'
  if (isSameDayTimestamp(timestamp, yesterday.getTime())) return 'Вчера'
  return new Date(timestamp).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
