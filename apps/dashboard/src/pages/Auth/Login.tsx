import { AuthLogin } from '~/components/Authentication/Login'
import { useNoLayout } from '~/hooks/useNoLayout'
import { useOnlyNoAuth } from '~/hooks/useOnlyNoAuth'
import { usePageTitle } from '~/hooks/usePageTitle'

export const LoginPage: React.FC = () => {
  useOnlyNoAuth()
  useNoLayout()
  usePageTitle('Login')

  return <AuthLogin />
}
