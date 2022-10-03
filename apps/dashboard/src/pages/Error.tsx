import { useRouteError } from 'react-router-dom'
import { Container } from '@mantine/core'

export const ErrorPage: React.FC = () => {
  const error = useRouteError() as Error

  return (
    <Container sx={{ maxWidth: 'unset' }} p="md">
      <h1>Error</h1>
      <p>{error.message}</p>
    </Container>
  )
}
