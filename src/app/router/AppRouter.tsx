import { Navigate, Route, Routes } from 'react-router-dom'
import { useCredentials } from '@/entities/session'
import { ChatPage } from '@/pages/chat'
import { LoginPage } from '@/pages/login'
import { ROUTES } from '@/shared/config'

export const AppRouter = () => {
  const isAuthenticated = useCredentials() !== null

  return (
    <Routes>
      <Route
        path={ROUTES.LOGIN}
        element={isAuthenticated ? <Navigate to={ROUTES.HOME} replace /> : <LoginPage />}
      />
      <Route
        path={ROUTES.HOME}
        element={isAuthenticated ? <ChatPage /> : <Navigate to={ROUTES.LOGIN} replace />}
      />
      <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
    </Routes>
  )
}
