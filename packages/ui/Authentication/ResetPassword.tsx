import { Button, Container, Group, Paper, TextInput, Title } from '@mantine/core'

interface Props {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  isLoading: boolean
  isDisabled: boolean
  newPasswordInputProps?: any
  confirmPasswordInputProps?: any
}

export const ResetPassword: React.FC<Props> = (props) => {
  const { handleSubmit, isDisabled, isLoading, newPasswordInputProps = {}, confirmPasswordInputProps = {} } = props

  return (
    <Container size={420} my={40}>
      <Title order={3} align="center" sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}>
        Reset Password
      </Title>

      <form onSubmit={handleSubmit}>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput label="New Password" placeholder="New Password" type="password" {...newPasswordInputProps} required />
          <TextInput label="Confirm New Password" placeholder="Confirm New Password" type="password" {...confirmPasswordInputProps} required />

          <Group position="right" mt="md">
            <Button type="submit" loading={isLoading} disabled={isDisabled}>
              Reset Password
            </Button>
          </Group>
        </Paper>
      </form>
    </Container>
  )
}
