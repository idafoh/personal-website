import Head from 'next/head'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useDebouncedState } from '@mantine/hooks'
import { useNotification } from 'hooks'
import { Register } from 'ui'
import { usePlausible } from 'next-plausible'
import { useAuth } from '../../context/auth'
import { client } from '../../lib/api-client'

const checkAvilability = async (endpoint: string, value: string, cb: (val: boolean) => void) => {
  try {
    await client(`${endpoint}/${value}`)
    cb(true)
  } catch (error) {
    cb(false)
  }
}

const RegisterPage: NextPage = () => {
  const router = useRouter()
  const plausible = usePlausible()
  const { register } = useAuth()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useDebouncedState('', 700)
  const [email, setEmail] = useDebouncedState('', 700)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const { show, update } = useNotification()

  const [usernameAlreadyExists, setUsernameAlreadyExists] = useState(false)
  const [emailAlreadyExists, setEmailAlreadyExists] = useState(false)

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    // I don't care result whether is successfull or not
    // IMPORTANT: Never send data to plausible that can be used to identify a user
    plausible('try-register')

    const data = {
      firstName,
      lastName,
      username,
      email,
      password,
      confirmPassword,
    }

    show({ title: 'Registering', message: 'Please wait...', loading: true })

    try {
      const token = await grecaptcha.execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, { action: 'submit' })
      await register({ ...data, token })
      router.push('/auth/login')
      update({ title: 'Success', message: 'You have been registered successfully' }, { success: true })
    } catch (error: any) {
      update({ title: 'Error', message: error.message }, { error: true })
    }
  }

  useEffect(() => {
    if (username) {
      checkAvilability('auth/check-username', username, setUsernameAlreadyExists)
    }
    if (email && email.includes('@')) {
      checkAvilability('auth/check-email', email, setEmailAlreadyExists)
    }
  }, [username, email])

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    switch (name) {
      case 'firstName':
        setFirstName(value)
        break

      case 'lastName':
        setLastName(value)
        break

      case 'username':
        setUsername(value?.toLowerCase())
        break

      case 'email':
        setEmail(value)
        break

      case 'password':
        setPassword(value)
        break

      case 'confirmPassword':
        setConfirmPassword(value)
        break
    }
  }

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>

      <Register className="blue-links" anchorProps={{ component: Link, href: '/auth/login' }}>
        <Register.Form
          onSubmit={onSubmit}
          forgotPasswordAnchorProps={{ component: Link, href: '/forgot-password' }}
          firstNameProps={{ required: true, name: 'firstName', value: firstName, onChange: onChangeHandler }}
          lastNameProps={{ required: true, name: 'lastName', value: lastName, onChange: onChangeHandler }}
          usernameProps={{ required: true, name: 'username', defaultValue: username, onChange: onChangeHandler, error: usernameAlreadyExists ? 'Username already exists' : undefined }}
          emailProps={{ required: true, name: 'email', defaultValue: email, onChange: onChangeHandler, error: emailAlreadyExists ? 'Email already exists' : undefined }}
          passwordProps={{ required: true, name: 'password', value: password, onChange: onChangeHandler, minLength: 6 }}
          confirmPasswordProps={{ required: true, name: 'confirmPassword', value: confirmPassword, onChange: onChangeHandler, minLength: 6 }}
        />
      </Register>
    </>
  )
}

export default RegisterPage
