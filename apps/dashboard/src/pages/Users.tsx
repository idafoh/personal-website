import { LoaderFunction, useLoaderData } from 'react-router-dom'
import { Container, Paper } from '@mantine/core'
import { UsersTable } from '../components/Users/Table'
import { usePageTitle } from '../hooks/usePageTitle'
import { client } from '~/lib/api-client'
import { getToken } from '~/lib/auth-provider'

export const UsersPage: React.FC = () => {
  usePageTitle('Users')
  const { users } = useLoaderData() as any

  return (
    <Container sx={{ maxWidth: 'unset' }} p="md">
      <Paper shadow="sm" p="lg">
        <UsersTable data={users} />
      </Paper>
    </Container>
  )
}

export const loader: LoaderFunction = async () => {
  try {
    const result = await client('users', { token: await getToken() })

    return result
  } catch (error) {
    return { users: [], total: 0 }
  }
}
