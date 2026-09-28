import axios from 'axios'

export const getApiErrorMessage = (error: unknown): string => {
  if (!axios.isAxiosError(error)) {
    return error instanceof Error ? error.message : 'Неизвестная ошибка'
  }
  if (!error.response) return 'Нет соединения с сервером GREEN-API'

  switch (error.response.status) {
    case 400:
      return 'Некорректный запрос'
    case 401:
    case 403:
      return 'Неверный idInstance или apiTokenInstance'
    case 429:
      return 'Слишком много запросов, попробуйте позже'
    case 466:
      return 'Превышен лимит тарифа GREEN-API'
    default:
      return `Ошибка сервера (${error.response.status})`
  }
}
