import { ActionFunction } from 'react-router-dom'
import { client } from '~/lib/api-client'
import { getToken } from '~/lib/auth-provider'

interface SendData {
  email?: string
  username?: string
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const email = formData.get('email') as string
  const username = formData.get('username') as string

  if (!email && !username) {
    return { ok: true }
  }

  const data: SendData = {}

  email && (data.email = email)
  username && (data.username = username)

  try {
    await client('users/me', {
      data,
      method: 'PATCH',
      token: await getToken(),
    })

    return { ok: true }
  } catch (error) {
    return { ok: false }
  }
}
