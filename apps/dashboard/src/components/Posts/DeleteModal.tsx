const confirmDeleteKey = 'delete-post'
import { useState } from 'react'
import { Button, Group, Modal, TextInput, Title } from '@mantine/core'

interface Props {
  opened: boolean
  onClose(): void
  id: number
  title: string
  deleteCallback(): void
}

export const DeleteModal: React.FC<Props> = ({ opened, onClose, id, title, deleteCallback }) => {
  const [confirmDelete, setConfirmDelete] = useState('')

  return (
    <Modal key={id} opened={opened} onClose={onClose} title="Delete Post">
      <Title order={5}>Are you sure you want to delete post &ldquo;{title}&ldquo;?</Title>

      <TextInput label="Confirmation request" value={confirmDelete} onChange={(e) => setConfirmDelete(e.target.value)} mt="md" placeholder={confirmDeleteKey} required />

      <Group position="right" mt="md">
        <Button variant="outline" mt="md" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="outline" color="red" mt="md" onClick={deleteCallback} disabled={confirmDelete !== confirmDeleteKey}>
          Delete post
        </Button>
      </Group>
    </Modal>
  )
}
