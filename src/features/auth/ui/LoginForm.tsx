import { useMutation } from '@tanstack/react-query'
import { useState, type FormEvent } from 'react'
import { sessionModel } from '@/entities/session'
import { getApiErrorMessage, greenApi, type GreenApiCredentials } from '@/shared/api'
import { buildDefaultApiUrl } from '@/shared/config'
import { Alert, Button, Input } from '@/shared/ui'
import { INSTANCE_STATE_MESSAGES, InstanceStateError } from '../model/instanceStateError'

const verifyCredentials = async (credentials: GreenApiCredentials) => {
  const { stateInstance } = await greenApi.getStateInstance(credentials)
  if (stateInstance !== 'authorized') throw new InstanceStateError(stateInstance)
  return credentials
}

const LoginError = ({ error }: { error: Error }) => {
  if (!(error instanceof InstanceStateError) || error.state === 'authorized') {
    return <Alert title="Не удалось войти">{getApiErrorMessage(error)}</Alert>
  }

  const { title, description } = INSTANCE_STATE_MESSAGES[error.state] ?? {
    title: 'Инстанс недоступен',
    description: `Статус инстанса: ${error.state}`,
  }

  return (
    <Alert title={title}>
      <p>{description}</p>
      <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="text-xs text-text-muted">stateInstance: {error.state}</span>
        <a
          href="https://console.green-api.com"
          target="_blank"
          rel="noreferrer"
          className="font-medium text-accent hover:underline"
        >
          Открыть личный кабинет →
        </a>
      </p>
    </Alert>
  )
}

export const LoginForm = () => {
  const [idInstance, setIdInstance] = useState(import.meta.env.VITE_ID_INSTANCE ?? '')
  const [apiTokenInstance, setApiTokenInstance] = useState(
    import.meta.env.VITE_API_TOKEN_INSTANCE ?? '',
  )
  const [apiUrl, setApiUrl] = useState(import.meta.env.VITE_API_URL ?? '')

  const defaultApiUrl = idInstance.length >= 4 ? buildDefaultApiUrl(idInstance) : ''

  const { mutate, isPending, error, reset } = useMutation({
    mutationFn: verifyCredentials,
    onSuccess: sessionModel.setCredentials,
  })

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    mutate({
      idInstance: idInstance.trim(),
      apiTokenInstance: apiTokenInstance.trim(),
      apiUrl: apiUrl.trim() || defaultApiUrl,
    })
  }

  return (
    <form onSubmit={handleSubmit} onChange={() => error && reset()} className="flex flex-col gap-4">
      <Input
        label="idInstance"
        placeholder="1101000001"
        inputMode="numeric"
        autoComplete="username"
        value={idInstance}
        onChange={(event) => setIdInstance(event.target.value.replace(/\D/g, ''))}
        required
      />
      <Input
        label="apiTokenInstance"
        placeholder="d75b3a66374942c5b3c019c698abc2067e151558acbd412345"
        type="password"
        autoComplete="current-password"
        value={apiTokenInstance}
        onChange={(event) => setApiTokenInstance(event.target.value)}
        required
      />
      <Input
        label="apiUrl"
        placeholder={defaultApiUrl || 'https://1101.api.green-api.com'}
        hint="Необязательно. По умолчанию строится из idInstance — укажите, если в личном кабинете другой"
        type="url"
        value={apiUrl}
        onChange={(event) => setApiUrl(event.target.value)}
      />

      {error && <LoginError error={error} />}

      <Button type="submit" disabled={isPending || !idInstance || !apiTokenInstance} className="mt-2">
        {isPending ? 'Проверяем…' : error ? 'Попробовать снова' : 'Войти'}
      </Button>
    </form>
  )
}
