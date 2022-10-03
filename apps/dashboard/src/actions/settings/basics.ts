import { ActionFunction } from 'react-router-dom'
import { client } from '~/lib/api-client'
import { getToken } from '~/lib/auth-provider'

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const firstName = formData.get('firstName') as string
  const lastName = formData.get('lastName') as string

  try {
    await client('users/me', {
      method: 'PATCH',
      token: await getToken(),
      data: { firstName, lastName },
    })

    return { ok: true }
  } catch (error) {
    return { ok: false }
  }
}
