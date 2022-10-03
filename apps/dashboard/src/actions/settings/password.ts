import { ActionFunction } from 'react-router-dom'
import { client } from '~/lib/api-client'
import { getToken } from '~/lib/auth-provider'

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const currentPassword = formData.get('currentPassword') as string
  const newPassword = formData.get('newPassword') as string
  const confirmPassword = formData.get('confirmPassword') as string

  if (newPassword !== confirmPassword) {
    return { message: 'New password and confirm password do not match' }
  }

  const data = { password: currentPassword, newPassword }

  try {
    await client('users/me/password', {
      data,
      method: 'PATCH',
      token: await getToken(),
    })

    return { ok: true }
  } catch (error) {
    return { ok: false }
  }
}
