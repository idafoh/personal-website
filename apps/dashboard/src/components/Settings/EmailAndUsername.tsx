import { createRef, useEffect, useState } from 'react'
import { useFetcher } from 'react-router-dom'
import { Button, Group, Paper, TextInput, Title } from '@mantine/core'
import { useClickOutside, useMergedRef } from '@mantine/hooks'
import { showNotification } from '@mantine/notifications'
import { IconPencil, IconAt, IconX, IconCheck } from '@tabler/icons'

interface Props {
  initialValues: {
    email: string
    username: string
  }
  className?: string
}

export const EmailAndUsernameSettings: React.FC<Props> = ({ className, initialValues }) => {
  const { Form, data } = useFetcher()
  const [focused, setFocused] = useState(false)
  const [emailReadOnly, setEmailReadOnly] = useState(true)
  const myRef = createRef<HTMLInputElement>()
  const clickOutSideRef = useClickOutside<HTMLInputElement>(() => setEmailReadOnly(true))
  const emailRef = useMergedRef(myRef, clickOutSideRef)

  useEffect(() => {
    if (data && !data.ok) {
      showNotification({
        color: 'red',
        title: 'Error',
        message: 'Something went wrong',
        icon: <IconX />,
      })
    } else if (data?.ok) {
      showNotification({
        color: 'teal',
        title: 'Success',
        message: 'Settings updated',
        icon: <IconCheck />,
      })
    }
  }, [data])

  return (
    <Paper shadow="sm" p="md" title="Email & Username" mt="md">
      <Title order={4} mb="md">
        Email & Username:
      </Title>

      <Form method="patch" action="/settings/update/emailAndUsername">
        <TextInput className={className} onFocus={() => setFocused(true)} label="Username" name="username" defaultValue={initialValues.username} required />
        <TextInput
          ref={emailRef}
          className={className}
          onFocus={() => setFocused(true)}
          label="Email"
          name="email"
          icon={<IconAt size={14} />}
          rightSection={<IconPencil size={16} />}
          rightSectionProps={{
            style: { cursor: 'pointer' },
            onClick: () => {
              setEmailReadOnly(false)
              myRef.current?.focus()
            },
          }}
          defaultValue={initialValues.email}
          readOnly={emailReadOnly}
          disabled={emailReadOnly}
          required
        />

        <Group position="right" mt="md">
          <Button variant="outline" mt="md" type="submit" disabled={!focused}>
            Change email & username
          </Button>
        </Group>
      </Form>
    </Paper>
  )
}
