import { useCallback, useEffect, useState } from 'react'
import { useFetcher } from 'react-router-dom'
import { IconX, IconCheck } from '@tabler/icons'
import { Button, Group, Paper, TextInput, Title } from '@mantine/core'
import { showNotification } from '@mantine/notifications'

interface Props {
  className?: string
}

export const PasswordSettings: React.FC<Props> = ({ className }) => {
  const { Form, data } = useFetcher()
  const [focused, setFocused] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (data && !data.ok && !data.message) {
      showNotification({
        color: 'red',
        title: 'Error',
        message: 'Something went wrong',
        icon: <IconX />,
      })
    } else {
      setMessage(data?.message)
    }

    if (data?.ok) {
      showNotification({
        color: 'teal',
        title: 'Success',
        message: 'Password has been changed',
        icon: <IconCheck />,
      })
    }
  }, [data])

  const clearMessage = useCallback(() => {
    setMessage('')
    setFocused(true)
  }, [])

  return (
    <Paper shadow="sm" p="md" title="Change password" mt="md">
      <Title order={4} mb="md">
        Change password:
      </Title>

      <Form method="patch" action="/settings/update/password">
        <TextInput className={className} onFocus={clearMessage} label="Current password" type="password" name="currentPassword" required />
        <TextInput className={className} onFocus={clearMessage} label="New password" type="password" mt="md" name="newPassword" required />
        <TextInput className={className} onFocus={clearMessage} error={message} label="Confirm new password" type="password" mt="md" name="confirmPassword" required />

        <Group position="right" mt="md">
          <Button variant="outline" mt="md" type="submit" disabled={!focused}>
            Change password
          </Button>
        </Group>
      </Form>
    </Paper>
  )
}
