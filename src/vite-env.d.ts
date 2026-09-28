/// <reference types="vite/client" />

/** Необязательные значения для автозаполнения формы входа */
interface ImportMetaEnv {
  readonly VITE_ID_INSTANCE?: string
  readonly VITE_API_TOKEN_INSTANCE?: string
  readonly VITE_API_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
