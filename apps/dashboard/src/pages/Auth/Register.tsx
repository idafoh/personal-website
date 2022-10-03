import { AuthRegister } from '~/components/Authentication/Register'
import { useNoLayout } from '~/hooks/useNoLayout'
import { useOnlyNoAuth } from '~/hooks/useOnlyNoAuth'
import { usePageTitle } from '~/hooks/usePageTitle'

export const RegisterPage: React.FC = () => {
  useOnlyNoAuth()
  useNoLayout()
  usePageTitle('Register')

  return <AuthRegister />
}
