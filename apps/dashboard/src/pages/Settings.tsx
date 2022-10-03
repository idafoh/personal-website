import { Container, createStyles } from '@mantine/core'
import { BasicSettings } from '../components/Settings/Basics'
import { EmailAndUsernameSettings } from '../components/Settings/EmailAndUsername'
import { PasswordSettings } from '../components/Settings/Password'
import { DangerZone } from '~/components/Settings/DangerZone'
import { useAuth } from '../context/auth'
import { usePageTitle } from '../hooks/usePageTitle'

const useStyles = createStyles(() => ({
  input: {
    width: '50%',
    margin: '0 auto',
  },
}))

export const SettingsPage: React.FC = () => {
  const { classes } = useStyles()
  const { user } = useAuth()
  const [firstName, lastName] = user?.fullName.split(' ') || []
  const email = user?.email || ''
  const username = user?.username || ''
  const avatar = user?.avatar

  usePageTitle('Settings')

  return (
    <Container sx={{ maxWidth: 'unset' }} p="md">
      <BasicSettings className={classes.input} initialValues={{ firstName, lastName, avatar }} />
      <EmailAndUsernameSettings className={classes.input} initialValues={{ email, username }} />
      <PasswordSettings className={classes.input} />
      <DangerZone />
    </Container>
  )
}
