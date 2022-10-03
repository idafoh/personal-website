import { forwardRef } from 'react'
import { TextInput, PasswordInput, Checkbox, Anchor, Paper, Title, Text, Container, Group, Button } from '@mantine/core'
import { createPolymorphicComponent } from '@mantine/utils'

interface LoginProps {
  children: React.ReactNode
  anchorProps: any
  className?: string
}

interface FormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  forgotPasswordAnchorProps: any
  usernameProps?: any
  passwordProps?: any
}

const _Login = forwardRef<HTMLDivElement, LoginProps>((props, ref) => {
  const { children, className, anchorProps } = props

  return (
    <Container ref={ref} className={className} size={420} my={40}>
      <Title align="center" sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}>
        Welcome back!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{' '}
        <Anchor {...anchorProps} size="sm">
          Create account
        </Anchor>
      </Text>

      {children}
    </Container>
  )
}) as any

const Form: React.FC<FormProps> = (props) => {
  const { onSubmit, usernameProps = {}, passwordProps = {}, forgotPasswordAnchorProps = {} } = props

  return (
    <form onSubmit={onSubmit}>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput label="Username" placeholder="superuser" required {...usernameProps} />
        <PasswordInput label="Password" placeholder="Your password" required mt="md" {...passwordProps} />
        <Group position="apart" mt="md">
          <Checkbox label="Remember me" />
          <Anchor {...forgotPasswordAnchorProps} size="sm">
            Forgot password?
          </Anchor>
        </Group>
        <Button fullWidth mt="xl" type="submit">
          Sign in
        </Button>
      </Paper>
    </form>
  )
}

_Login.displayName = 'Login'
_Login.Form = Form
_Login.Form.displayName = 'LoginForm'

export const Login = createPolymorphicComponent<'div', LoginProps, { Form: typeof Form }>(_Login)
