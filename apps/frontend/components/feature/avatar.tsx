import { useState } from 'react'
import { Avatar as MantineAvatar, Menu } from '@mantine/core'
import { Icon } from '@iconify/react'
import { ConfirmLogoutModal } from 'ui'
import { useRouter } from 'next/router'
import { useAuth } from '../../context/auth'

const dashboardUrl = process.env.NEXT_PUBLIC_DASHBOARD_URL

export const Avatar: React.FC = () => {
  const router = useRouter()
  const [modalOpened, setModalOpened] = useState(false)
  const [menuOpened, setMenuOpened] = useState(false)
  const { user, logout } = useAuth()

  const onClickHandler = () => {
    if (!user) {
      router.push('/auth/login')
    }
  }

  const onMenuChange = (opened: boolean) => {
    if (!user) {
      return
    }
    setMenuOpened(opened)
  }

  const logoutFn = () => {
    logout()
    setModalOpened(false)
    router.push('/')
  }

  return (
    <>
      <Menu trigger="click" openDelay={100} closeDelay={400} opened={menuOpened} onChange={onMenuChange} withArrow>
        <Menu.Target>
          <MantineAvatar onClick={onClickHandler} src={user?.avatar} alt={user?.fullName} className="hover-onpoint" radius="xl" />
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Application</Menu.Label>
          <Menu.Item component="a" href={`${dashboardUrl}/posts/all`} target="_blank" rel="noreferrer noopener" icon={<Icon icon="tabler:external-link" fontSize={14} />}>
            Dashboard
          </Menu.Item>
          <Menu.Divider />
          <Menu.Label>Danger zone</Menu.Label>
          <Menu.Item color="red" onClick={() => setModalOpened(true)} icon={<Icon icon="tabler:logout" fontSize={14} />}>
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>

      <ConfirmLogoutModal opened={modalOpened} onClose={() => setModalOpened(false)} logoutFn={logoutFn} />
    </>
  )
}
