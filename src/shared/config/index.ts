export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
} as const

export const buildDefaultApiUrl = (idInstance: string) =>
  `https://${idInstance.slice(0, 4)}.api.green-api.com`
