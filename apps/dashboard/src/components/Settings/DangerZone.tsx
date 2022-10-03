const confirmDeleteKey = 'delete-my-account'
import { useState } from 'react'
import { Button, Group, Modal, Paper, Space, Text, TextInput, Title } from '@mantine/core'
import { useClient } from '~/hooks/useClient'

interface DeleteAccountModalProps {
  onClose(): void
  opened: boolean
  deleteFn(): void
}

const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({ onClose, opened, deleteFn }) => {
  const [confirmDelete, setConfirmDelete] = useState('')

  return (
    <Modal opened={opened} onClose={onClose} title="Delete account">
      <Title order={5} mb="md" size="h5">
        Are you sure you want to delete your account?
      </Title>

      <TextInput label="Confirmation request" value={confirmDelete} onChange={(e) => setConfirmDelete(e.target.value)} mt="md" placeholder={confirmDeleteKey} required />

      <Group position="right" mt="md">
        <Button variant="outline" mt="md" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="outline" color="red" mt="md" onClick={deleteFn} disabled={confirmDelete !== confirmDeleteKey}>
          Delete account
        </Button>
      </Group>
    </Modal>
  )
}

export const DangerZone: React.FC = () => {
  const client = useClient()
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)

  const deleteAccount = async () => {
    try {
      await client('users/me', { method: 'DELETE' })
      window.location.href = '/auth/login'
    } catch (error) {}
  }

  return (
    <>
      <Paper sx={{ borderColor: 'red' }} withBorder shadow="sm" p="md" title="Danger zone" mt="md">
        <Title order={4} mb="md">
          Danger zone
        </Title>

        <Text px={30} size="sm">
          Permanently remove your Personal Account and all of its contents from the this site.
          <Space />
          This action is not reversible, so please continue with caution.
        </Text>

        <Group position="right" mt="md">
          <Button variant="filled" onClick={() => setDeleteModalOpen(true)} color="red" mt="md" type="submit">
            Delete Account
          </Button>
        </Group>
      </Paper>

      <DeleteAccountModal opened={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} deleteFn={deleteAccount} />
    </>
  )
}
