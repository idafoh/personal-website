import { useEffect } from 'react'
import { Card, Container, Space, Text, Title } from '@mantine/core'

const rootEl = document.getElementById('root')!

export const NotCompatibleDevice: React.FC = () => {
  useEffect(() => {
    rootEl.style.paddingLeft = '0'
  }, [])

  return (
    <Container sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Card shadow="md" p="lg">
        <Title order={2} mb="md" align="center" sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}` })}>
          Your device is not compatible
        </Title>
        <Text align="center">
          This dashboard is designed for desktop devices.
          <Space />
          Please open it on your laptop or desktop computer.
        </Text>
      </Card>
    </Container>
  )
}
