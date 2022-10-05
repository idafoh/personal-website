import Head from 'next/head'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useNotification } from 'hooks'
import { Login } from 'ui'
import { useAuth } from '../../context/auth'

const LoginPage: NextPage = () => {
  const router = useRouter()
  const { login } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const { show, update } = useNotification()

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const data = { username, password }

    show({ title: 'Logging in', message: 'Please wait...', loading: true })

    try {
      await login(data)
      router.replace('/')
      update({ title: 'Success', message: 'You have been logged in successfully' }, { success: true })
    } catch (error) {
      update({ title: 'Error', message: 'Invalid username or password' }, { error: true })
    }
  }

  const onChangeHandler = (type: 'username' | 'password') => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    switch (type) {
      case 'username': {
        const val = value?.trim().toLowerCase() || ''
        const matchesOk = val.match(/^[a-z][a-z0-9_]*$/) !== null
        setUsername(val)
        val.length < 5 && setUsernameError('Username must have at least 5 letters')
        !matchesOk && setUsernameError('Use only lowercase letters, numbers and underscore')
        matchesOk && usernameError.length > 0 && val.length > 4 && setUsernameError('')
        break
      }

      case 'password':
        setPassword(value)
        break
    }
  }

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <Login className="blue-links" anchorProps={{ component: Link, href: '/auth/register' }}>
        <Login.Form
          onSubmit={onSubmit}
          forgotPasswordAnchorProps={{ component: Link, href: '/forgot-password' }}
          usernameProps={{ required: true, value: username, onChange: onChangeHandler('username'), minLength: 5, error: usernameError }}
          passwordProps={{ required: true, value: password, onChange: onChangeHandler('password'), minLength: 6 }}
        />
      </Login>
    </>
  )
}

export default LoginPage
