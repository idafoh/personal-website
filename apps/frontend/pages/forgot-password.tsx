import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDebouncedState } from '@mantine/hooks'
import { ForgotPassword } from 'ui'
import { useNotification } from 'hooks'
import { usePlausible } from 'next-plausible'
import { useClient } from '../hooks/use-client'

const ForgotPasswordPage: NextPage = () => {
  const client = useClient()
  const plausible = usePlausible()
  const router = useRouter()
  const { show } = useNotification()
  const [email, setEmail] = useDebouncedState('', 700)
  const [isLoading, setIsLoading] = useState(false)
  const [emailError, setEmailError] = useState('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // I don't care result whether is successfull or not
    // IMPORTANT: Never send data to plausible that can be used to identify a user
    plausible('send-password-restore-link')

    if (!email) {
      setEmailError('Email is required')
      setTimeout(() => {
        setEmailError('')
      }, 3000)
      return
    }

    try {
      setIsLoading(true)
      const token = await grecaptcha.execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, { action: 'forgot_password' })
      await client('auth/forgot-password', { data: { email, token } })
      show({ title: 'Email sent', message: 'Check your email' }, { success: true })
    } catch (error) {
      show({ title: "Can't send email", message: 'Something went wrong' }, { error: true })
    } finally {
      setIsLoading(false)
      router.replace('/auth/login')
    }
  }

  useEffect(() => {
    if (!email || !email.includes('@')) return

    setIsLoading(true)
    client(`auth/check-email/${email}`).then((data) => {
      setIsLoading(false)
      if (!data) {
        setEmailError('User with this email does not exist')
      } else {
        setEmailError('')
      }
    })
  }, [email, client])

  return (
    <ForgotPassword
      handleSubmit={handleSubmit}
      isLoading={isLoading}
      isDisabled={emailError.length > 0}
      emailInputProps={{ required: true, defaultValue: email, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value), error: emailError }}
    />
  )
}

export default ForgotPasswordPage
