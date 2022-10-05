import { useRef } from 'react'
import { TextInput, Textarea, Button, Group, SimpleGrid } from '@mantine/core'
import { useNotification } from 'hooks'
import { useClient } from '../../hooks/use-client'
import { usePlausible } from 'next-plausible'

export const ContactForm: React.FC = () => {
  const client = useClient()
  const plausible = usePlausible()
  const { show, update } = useNotification()
  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)

  const resetInputs = () => {
    nameRef.current!.value = ''
    emailRef.current!.value = ''
    messageRef.current!.value = ''
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const name = nameRef.current!.value
    const email = emailRef.current!.value
    const message = messageRef.current!.value

    if (!name || !email || !message) {
      return
    }

    const data = { name, email, message }
    show({ title: 'Sending message', message: 'Please wait...', loading: true })

    try {
      await client('contact', { data })
      update(
        {
          title: 'Message sent',
          message: 'Your message has been sent. Thank you for contacting',
        },
        { success: true }
      )

      resetInputs()
    } catch (error) {
      update(
        {
          title: 'Error',
          message: 'Something went wrong, please try again later',
        },
        {
          error: true,
        }
      )
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <SimpleGrid cols={2} mt="xl" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
        <TextInput ref={nameRef} label="Name" placeholder="Your name" name="name" variant="filled" required />
        <TextInput ref={emailRef} label="Email" placeholder="Your email" name="email" variant="filled" required />
      </SimpleGrid>

      {/* <TextInput label="Subject" placeholder="Subject" mt="md" name="subject" variant="filled" required /> */}
      <Textarea ref={messageRef} mt="md" label="Message" placeholder="Your message" maxRows={10} minRows={5} autosize name="message" variant="filled" required />

      <Group position="center" my="xl">
        <Button type="submit" size="md" onClick={() => plausible('try-send-message')}>
          Send message
        </Button>
      </Group>
    </form>
  )
}
