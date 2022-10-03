import { useLocation, useNavigate, Link } from 'react-router-dom'
import { Login } from 'ui'
import { useForm } from '@mantine/form'
import { LoginData as IFormData, useAuth } from '~/context/auth'

export const AuthLogin: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const auth = useAuth()

  const form = useForm<IFormData>({
    initialValues: { username: '', password: '' },

    validate: {
      username: (value) => (/^[a-zA-Z0-9_]*$/.test(value) ? null : 'Invalid username'),
      password: (value) => (value.length < 6 ? 'Password must have at least 6 letters' : null),
    },
  })

  const from = location.state?.from?.pathname || '/posts/all'

  const handleSubmit = async (data: IFormData, event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const response = await auth.login(data)

    if (!response.ok) {
      switch (response.statusCode) {
        case 404:
          form.setErrors({ username: 'User does not exists with this username' })
          break
        case 400:
          form.setErrors({ username: response.message, password: response.message })
          break
      }
    } else {
      navigate(from, { replace: true })
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
