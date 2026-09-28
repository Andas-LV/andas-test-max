import { LoginForm } from '@/features/auth'
import { ChatBubbleIcon } from '@/shared/ui'

export const LoginPage = () => (
  <main className="flex min-h-dvh items-center justify-center bg-chat p-4">
    <div className="w-full max-w-sm rounded-3xl bg-surface p-6 shadow-sm sm:p-8">
      <div className="mb-6 flex flex-col items-center gap-3 text-center">
        <div className="flex size-14 items-center justify-center rounded-2xl bg-linear-to-br from-accent to-violet-500 text-white">
          <ChatBubbleIcon width={28} height={28} />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-text">Вход в MAX Chat</h1>
          <p className="mt-1 text-sm text-text-secondary">
            Введите данные инстанса из{' '}
            <a
              href="https://console.green-api.com"
              target="_blank"
              rel="noreferrer"
              className="text-accent hover:underline"
            >
              личного кабинета GREEN-API
            </a>
          </p>
        </div>
      </div>
      <LoginForm />
    </div>
  </main>
)
