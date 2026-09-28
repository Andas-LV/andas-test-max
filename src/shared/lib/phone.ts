/** Оставляет только цифры, 8XXXXXXXXXX → 7XXXXXXXXXX */
export const normalizePhone = (value: string) => {
  const digits = value.replace(/\D/g, '')
  return digits.length === 11 && digits.startsWith('8') ? `7${digits.slice(1)}` : digits
}

export const isValidPhone = (phone: string) => /^\d{10,15}$/.test(phone)

export const formatPhone = (phone: string) => {
  const match = /^7(\d{3})(\d{3})(\d{2})(\d{2})$/.exec(phone)
  return match ? `+7 ${match[1]} ${match[2]}-${match[3]}-${match[4]}` : `+${phone}`
}
