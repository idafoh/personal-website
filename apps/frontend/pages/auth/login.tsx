import Head from 'next/head'
import { NextPage } from 'next'
import Link from 'next/link'
import { useState } from 'react'
import { Login } from 'ui'
import { useAuth } from '../../context/auth'
import { useRouter } from 'next/router'

const LoginPage: NextPage = () => {
  const router = useRouter()
  const { login } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const data = { username, password }

    try {
      await login(data)
      router.replace('/')
    } catch (error) {}
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
          usernameProps={{ required: true, value: username, onChange: (event: React.ChangeEvent<HTMLInputElement>) => setUsername(event.target.value) }}
          passwordProps={{ required: true, value: password, onChange: (event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value) }}
        />
      </Login>
    </>
  )
}

export default LoginPage
