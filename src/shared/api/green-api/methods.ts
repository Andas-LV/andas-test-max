import { axiosInstance } from '../axiosInstance'
import type {
  GetStateInstanceResponse,
  GreenApiCredentials,
  ReceiveNotificationResponse,
  SendMessageRequest,
  SendMessageResponse,
} from './types'

const buildUrl = (
  { apiUrl, idInstance, apiTokenInstance }: GreenApiCredentials,
  method: string,
  ...params: Array<string | number>
) => {
  const suffix = params.map((param) => `/${param}`).join('')
  return `${apiUrl.replace(/\/+$/, '')}/waInstance${idInstance}/${method}/${apiTokenInstance}${suffix}`
}

export const greenApi = {
  getStateInstance: async (credentials: GreenApiCredentials) => {
    const { data } = await axiosInstance.get<GetStateInstanceResponse>(
      buildUrl(credentials, 'getStateInstance'),
    )
    return data
  },

  sendMessage: async (credentials: GreenApiCredentials, body: SendMessageRequest) => {
    const { data } = await axiosInstance.post<SendMessageResponse>(
      buildUrl(credentials, 'sendMessage'),
      body,
    )
    return data
  },

  /** Long polling: ждёт уведомление до receiveTimeout секунд, null — очередь пуста */
  receiveNotification: async (
    credentials: GreenApiCredentials,
    { receiveTimeout = 20, signal }: { receiveTimeout?: number; signal?: AbortSignal } = {},
  ) => {
    const { data } = await axiosInstance.get<ReceiveNotificationResponse | null>(
      buildUrl(credentials, 'receiveNotification'),
      { params: { receiveTimeout }, signal, timeout: (receiveTimeout + 10) * 1000 },
    )
    return data
  },

  deleteNotification: async (
    credentials: GreenApiCredentials,
    receiptId: number,
    signal?: AbortSignal,
  ) => {
    const { data } = await axiosInstance.delete<{ result: boolean }>(
      buildUrl(credentials, 'deleteNotification', receiptId),
      { signal },
    )
    return data
  },
}
