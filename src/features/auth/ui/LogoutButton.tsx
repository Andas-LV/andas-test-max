import { IconButton, LogoutIcon } from '@/shared/ui'
import { useLogout } from '../model/useLogout'

export const LogoutButton = () => {
  const logout = useLogout()

  const handleClick = () => {
    if (window.confirm('Выйти? История чатов будет удалена с этого устройства')) logout()
  }

  return (
    <IconButton label="Выйти" onClick={handleClick}>
      <LogoutIcon />
    </IconButton>
  )
}
