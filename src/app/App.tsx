import { AppProviders } from './providers/AppProviders'
import { AppRouter } from './router/AppRouter'
import './styles/index.css'

export const App = () => (
  <AppProviders>
    <AppRouter />
  </AppProviders>
)
