import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { ResetPassword } from 'ui'
import { showNotification } from '@mantine/notifications'
import { useRouter } from 'next/router'
import { useDebouncedState } from '@mantine/hooks'
import { useClient } from '../hooks/use-client'
import { usePlausible } from 'next-plausible'

const ResetPasswordPage: NextPage = () => {
  const router = useRouter()
  const client = useClient()
  const plausible = usePlausible()
  const [token, setToken] = useState('')
  const [newPassword, setNewPassword] = useDebouncedState('', 400)
  const [confirmPassword, setConfirmPassword] = useDebouncedState('', 400)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // I don't care result whether is successfull or not
    // IMPORTANT: Never send data to plausible that can be used to identify a user
    plausible('try-reset-password')

    if (!newPassword || !confirmPassword) {
      setErrorMessage('New password is required')
      return
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match')
      return
    }

    const data = {
      password: newPassword,
      passwordConfirmation: confirmPassword,
      token,
      reCaptchatoken: await grecaptcha.execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, { action: 'reset_password' }),
    }

    setIsLoading(true)
    try {
      await client('auth/reset-password', { data })

      showNotification({ title: 'Password reset', message: 'Password reset successfully', color: 'teal' })
      router.replace('/auth/login')
    } catch (error) {
      showNotification({ title: "Can't reset password", message: 'Something went wrong', color: 'red' })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const token = searchParams.get('token')
    if (token) {
      setToken(token)
    } else {
      router.replace('/auth/login')
    }
  }, [router])

  useEffect(() => {
    if (newPassword.length > 0 && confirmPassword.length > 0 && newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match')
    } else {
      setErrorMessage('')
    }
  }, [newPassword, confirmPassword])

  const onChange = (type: 'newPassword' | 'confirmPassword') => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (type === 'newPassword') {
      setNewPassword(event.target.value)
    } else {
      setConfirmPassword(event.target.value)
    }

    if (errorMessage.length > 0) {
      setErrorMessage('')
    }
  }

  return (
    <ResetPassword
      handleSubmit={handleSubmit}
      isLoading={isLoading}
      isDisabled={errorMessage.length > 0}
      newPasswordInputProps={{ required: true, defaultValue: newPassword, onChange: onChange('newPassword'), error: errorMessage }}
      confirmPasswordInputProps={{ required: true, defaultValue: confirmPassword, onChange: onChange('confirmPassword'), error: errorMessage }}
    />
  )
}

export default ResetPasswordPage
