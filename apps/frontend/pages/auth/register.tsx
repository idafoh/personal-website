import Head from 'next/head'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useDebouncedState } from '@mantine/hooks'
import { Register } from 'ui'
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
  const { register } = useAuth()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useDebouncedState('', 700)
  const [email, setEmail] = useDebouncedState('', 700)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [usernameAlreadyExists, setUsernameAlreadyExists] = useState(false)
  const [emailAlreadyExists, setEmailAlreadyExists] = useState(false)

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const data = {
      firstName,
      lastName,
      username,
      email,
      password,
      confirmPassword,
    }

    try {
      await register(data)
      router.push('/auth/login')
    } catch (error) {}
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
        setUsername(value)
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

      default:
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
          passwordProps={{ required: true, name: 'password', value: password, onChange: onChangeHandler }}
          confirmPasswordProps={{ required: true, name: 'confirmPassword', value: confirmPassword, onChange: onChangeHandler }}
        />
      </Register>
    </>
  )
}

export default RegisterPage
