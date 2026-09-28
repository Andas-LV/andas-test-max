export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
} as const

/** Хост API по умолчанию строится из первых 4 цифр idInstance */
export const buildDefaultApiUrl = (idInstance: string) =>
  `https://${idInstance.slice(0, 4)}.api.green-api.com`
