import { Outlet } from 'react-router-dom'
import { useGlobal } from '~/context/global'
import { useAuth } from '~/context/auth'
import { NavbarNested } from '../Navigation/Navbar'
import { PanelHeader } from './PanelHeader'
import { createStyles } from '@mantine/core'
import { AskVerification } from '../AskVerification'

const useStyles = createStyles((theme) => ({
  '@global': {
    body: {
      color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : '#575757',
    },
  },
  main: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
  },
}))

export const Layout: React.FC = () => {
  const { classes } = useStyles()
  const { title } = useGlobal()
  const { user, verified } = useAuth()

  return (
    <>
      <NavbarNested image={user?.avatar} name={user?.fullName} email={user?.email} />

      {!verified && <AskVerification />}

      <main className={classes.main}>
        <PanelHeader title={title} />
        <Outlet />
      </main>
    </>
  )
}
