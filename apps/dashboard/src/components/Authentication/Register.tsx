import type { RegisterData } from '~/lib/auth-provider'
import { Link, useNavigate } from 'react-router-dom'
import { Register } from 'ui'
import { useForm } from '@mantine/form'
import { useAuth } from '~/context/auth'

type IFormData = Omit<RegisterData, 'token'>

export const AuthRegister: React.FC = () => {
  const auth = useAuth()
  const navigate = useNavigate()
  const form = useForm<IFormData>({
    initialValues: { firstName: '', lastName: '', username: '', email: '', password: '', confirmPassword: '' },

    validate: {
      username: (value) => (/^[a-z][a-z0-9_]*$/.test(value) && value.length > 4 ? null : 'Use only lowercase letters, min 5 letters'),
      password: (value) => (value.length < 6 ? 'Password must have at least 6 letters' : null),
      confirmPassword: (value, values) => (value !== values.password ? 'Passwords did not match' : null),
    },
  })

  const handleSubmit = async (data: IFormData, event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const token = await grecaptcha.execute(import.meta.env.VITE_RECAPTCHA_SITE_KEY, { action: 'register' })
      await auth.register({ ...data, token })
      navigate('/auth/login')
    } catch (error) {}
  }

  return (
    <Register anchorProps={{ component: Link, to: '/auth/login' }}>
      <Register.Form
        onSubmit={form.onSubmit(handleSubmit)}
        forgotPasswordAnchorProps={{ component: Link, to: '/forgot-password' }}
        firstNameProps={form.getInputProps('firstName')}
        lastNameProps={form.getInputProps('lastName')}
        usernameProps={form.getInputProps('username')}
        emailProps={form.getInputProps('email')}
        passwordProps={form.getInputProps('password')}
        confirmPasswordProps={form.getInputProps('confirmPassword')}
      />
    </Register>
  )
}
