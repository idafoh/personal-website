import type { LoginData } from '~/lib/auth-provider'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { Login } from 'ui'
import { useForm } from '@mantine/form'
import { useAuth } from '~/context/auth'

type IFormData = Omit<LoginData, 'token'>

export const AuthLogin: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const auth = useAuth()

  const form = useForm<IFormData>({
    initialValues: { username: '', password: '' },

    validate: {
      username: (value) => (/^[a-z][a-z0-9_]*$/.test(value) && value.length > 4 ? null : 'Use only lowercase letters, min 5 letters'),
      password: (value) => (value.length < 6 ? 'Password must have at least 6 letters' : null),
    },

    validateInputOnChange: ['username'],
  })

  const from = location.state?.from?.pathname || '/posts/all'

  const handleSubmit = async (data: IFormData, event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const token = await grecaptcha.execute(import.meta.env.VITE_RECAPTCHA_SITE_KEY, { action: 'login' })
      await auth.login({ ...data, token })

      navigate(from, { replace: true })
    } catch (error: any) {
      switch (error.statusCode) {
        case 404:
          form.setErrors({ username: 'User does not exists with this username' })
          break
        case 400:
          form.setErrors({ username: error.message, password: error.message })
          break
      }
    }
  }

  return (
    <Login anchorProps={{ component: Link, to: '/auth/register' }}>
      <Login.Form
        onSubmit={form.onSubmit(handleSubmit)}
        forgotPasswordAnchorProps={{ component: Link, to: '/forgot-password' }}
        usernameProps={form.getInputProps('username')}
        passwordProps={form.getInputProps('password')}
      />
    </Login>
  )
}
