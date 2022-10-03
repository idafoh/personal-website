import { forwardRef } from 'react'
import { TextInput, PasswordInput, Checkbox, Anchor, Paper, Title, Text, Container, Group, Button } from '@mantine/core'
import { createPolymorphicComponent } from '@mantine/utils'

interface RegisterProps {
  children: React.ReactNode
  className?: string
  anchorProps: any
}

interface FormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  forgotPasswordAnchorProps: any
  usernameProps?: any
  passwordProps?: any
  confirmPasswordProps?: any
  emailProps?: any
  lastNameProps?: any
  firstNameProps?: any
}

const _Register = forwardRef<HTMLDivElement, RegisterProps>((props, ref) => {
  const { children, className, anchorProps } = props

  return (
    <Container ref={ref} className={className} size={420} my={40}>
      <Title align="center" sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}>
        Welcome!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Already have an account?{' '}
        <Anchor {...anchorProps} size="sm">
          Login
        </Anchor>
      </Text>

      {children}
    </Container>
  )
}) as any

const Form: React.FC<FormProps> = (props) => {
  const { onSubmit, firstNameProps = {}, lastNameProps = {}, usernameProps = {}, emailProps = {}, passwordProps = {}, confirmPasswordProps = {}, forgotPasswordAnchorProps = {} } = props

  return (
    <form onSubmit={onSubmit}>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput label="Firstname" placeholder="Abat" required {...firstNameProps} />
        <TextInput label="Lastname" placeholder="Dauletbaev" mt="sm" {...lastNameProps} />
        <TextInput label="Username" placeholder="username" mt="sm" required {...usernameProps} />
        <TextInput label="Email" placeholder="example@mail.com" mt="sm" required {...emailProps} />
        <PasswordInput label="Password" placeholder="Your password" required mt="md" {...passwordProps} />
        <PasswordInput label="Confirm password" placeholder="Confirm password" required mt="sm" {...confirmPasswordProps} />
        <Group position="apart" mt="md">
          <Checkbox label="Remember me" />
          <Anchor {...forgotPasswordAnchorProps} size="sm">
            Forgot password?
          </Anchor>
        </Group>
        <Button fullWidth mt="xl" type="submit">
          Sign up
        </Button>
      </Paper>
    </form>
  )
}

_Register.displayName = 'Register'
_Register.Form = Form
_Register.Form.displayName = 'RegisterForm'

export const Register = createPolymorphicComponent<'div', RegisterProps, { Form: typeof Form }>(_Register)
