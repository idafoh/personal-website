import { Button, Container, Group, Paper, TextInput, Title } from '@mantine/core'

interface Props {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  isLoading: boolean
  isDisabled: boolean
  emailInputProps?: any
}

export const ForgotPassword: React.FC<Props> = (props) => {
  const { handleSubmit, isLoading, emailInputProps = {}, isDisabled } = props
  return (
    <Container size={420} my={40}>
      <Title order={3} align="center" sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}>
        Forgot Password
      </Title>

      <form onSubmit={handleSubmit}>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput label="Email" placeholder="Email" {...emailInputProps} />

          <Group position="right" mt="md">
            <Button type="submit" loading={isLoading} disabled={isDisabled}>
              Send reset link
            </Button>
          </Group>
        </Paper>
      </form>
    </Container>
  )
}
