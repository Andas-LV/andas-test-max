import { useQuery, type QueryKey } from '@tanstack/react-query'
import { queryClient } from './queryClient'

const readStorage = <T>(storageKey: string, initial: T): T => {
  try {
    const raw = localStorage.getItem(storageKey)
    return raw === null ? initial : (JSON.parse(raw) as T)
  } catch {
    return initial
  }
}

const writeStorage = (storageKey: string, value: unknown) => {
  try {
    localStorage.setItem(storageKey, JSON.stringify(value))
  } catch (error) {
    console.warn('Не удалось сохранить состояние в localStorage', error)
  }
}

export const createLocalQuery = <T>(queryKey: QueryKey, storageKey: string, initial: T) => {
  const load = () => readStorage(storageKey, initial)

  const get = () => queryClient.getQueryData<T>(queryKey) ?? load()

  const set = (value: T) => {
    queryClient.setQueryData(queryKey, value)
    writeStorage(storageKey, value)
  }

  const update = (updater: (prev: T) => T) => set(updater(get()))

  const useSelect = <R = T>(select?: (data: T) => R) =>
    useQuery({
      queryKey,
      queryFn: load,
      initialData: load,
      staleTime: Infinity,
      gcTime: Infinity,
      select,
    }).data as R

  return { get, set, update, reset: () => set(initial), useSelect }
}
