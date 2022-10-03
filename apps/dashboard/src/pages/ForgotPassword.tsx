import { useEffect, useState } from 'react'
import { ActionFunction, useFetcher, useNavigate } from 'react-router-dom'
import { ForgotPassword } from 'ui'
import { useDebouncedState } from '@mantine/hooks'
import { showNotification } from '@mantine/notifications'
import { IconCross } from '@tabler/icons'
import { usePageTitle } from '~/hooks/usePageTitle'
import { useOnlyNoAuth } from '~/hooks/useOnlyNoAuth'
import { useNoLayout } from '~/hooks/useNoLayout'
import { client } from '~/lib/api-client'
import { useClient } from '~/hooks/useClient'

export const ForgotPasswordPage: React.FC = () => {
  const clientHook = useClient()
  useOnlyNoAuth()
  useNoLayout()
  usePageTitle('Forgot Password')
  const navigate = useNavigate()
  const { data, submit, state } = useFetcher()
  const [email, setEmail] = useDebouncedState('', 700)
  const [emailError, setEmailError] = useState('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!email) {
      setEmailError('Email is required')
      return
    }

    submit({ email }, { action: '/forgot-password', method: 'post' })

    navigate('/auth/login', { replace: true })
  }

  useEffect(() => {
    if (!email || !email.includes('@')) return

    clientHook(`auth/check-email/${email}`).then((data) => {
      if (!data) {
        setEmailError('User with this email does not exist')
      } else {
        setEmailError('')
      }
    })
  }, [email])

  useEffect(() => {
    if (data && !data.ok) {
      showNotification({ title: "Can't send email", message: 'Something went wrong', color: 'red', icon: <IconCross /> })
    } else if (data && data.ok) {
      showNotification({ title: 'Email sent', message: 'Check your email', color: 'teal' })
    }
  }, [data])

  return (
    <ForgotPassword
      handleSubmit={handleSubmit}
      isLoading={state === 'loading' || state === 'submitting'}
      isDisabled={emailError.length > 0}
      emailInputProps={{ required: true, defaultValue: email, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value), error: emailError }}
    />
  )
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const email = formData.get('email') as string

  const data = { email }

  try {
    await client('auth/forgot-password', {
      method: 'POST',
      data,
    })
    return { ok: true }
  } catch (error) {
    return { ok: false }
  }
}
