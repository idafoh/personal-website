import { Button, Modal, Stack, Text, useMantineTheme } from '@mantine/core'
import Link from 'next/link'

interface Props {
  onClose: () => void
  opened: boolean
  [key: string]: any
}

export const RequestLoginModal: React.FC<Props> = ({ onClose, opened }) => {
  const theme = useMantineTheme()

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={<Text>Log in to continue</Text>}
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
    >
      <Text size="sm" mb="md">
        You need to be logged in to continue
      </Text>

      <Stack spacing="xs">
        <Link href="/auth/login" passHref>
          <Button component="a" variant="filled" color="blue">
            Log in
          </Button>
        </Link>
        <Link href="/auth/register" passHref>
          <Button component="a" variant="outline" color="blue">
            Register
          </Button>
        </Link>
      </Stack>
    </Modal>
  )
}
