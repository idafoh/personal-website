import { Button, Group, Modal, Text } from '@mantine/core'

interface Props {
  opened: boolean
  onClose: () => void
  logoutFn: () => void
}

export const ConfirmLogoutModal: React.FC<Props> = ({ opened, onClose, logoutFn }) => {
  return (
    <Modal opened={opened} onClose={onClose} title="Logout">
      <Text>Are you sure you want to logout?</Text>

      <Group position="right" mt="md">
        <Button onClick={onClose} variant="outline" color="red">
          Cancel
        </Button>
        <Button onClick={() => logoutFn()} variant="filled" color="red">
          Yes, logout
        </Button>
      </Group>
    </Modal>
  )
}
