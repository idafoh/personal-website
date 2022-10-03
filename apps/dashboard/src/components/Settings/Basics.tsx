import { useEffect, useMemo, useState } from 'react'
import { useFetcher } from 'react-router-dom'
import { IconPencil, IconTrash, IconUpload } from '@tabler/icons'
import { ActionIcon, Avatar, Button, createStyles, FileButton, Group, Menu, Paper, Stack, TextInput, Title } from '@mantine/core'
import { useNotification } from 'hooks'
import { useClient } from '~/hooks/useClient'

interface Props {
  initialValues: {
    firstName: string
    lastName: string
    avatar?: string
  }
  className?: string
}

const useStyles = createStyles(() => ({
  avatarWrapper: {
    position: 'relative',
    alignSelf: 'center',
  },
  avatarEditIcon: {
    position: 'absolute',
    right: -12,
    bottom: -3,
    borderRadius: '50%',
  },
  rounded: {
    borderRadius: '50%',
  },
}))

export const BasicSettings: React.FC<Props> = ({ className, initialValues }) => {
  const { classes } = useStyles()
  const client = useClient()
  const { show } = useNotification()
  const { show: showDelete, update: updateDelete } = useNotification()
  const { show: showSet, update: updateSet } = useNotification()
  const { data, submit } = useFetcher()
  const [avatarUrl, setAvatarUrl] = useState(initialValues.avatar || '')
  const [firstName, setFirstName] = useState(initialValues.firstName || '')
  const [lastName, setLastName] = useState(initialValues.lastName || '')

  const isActuallySomethingChanged = useMemo(() => firstName !== initialValues.firstName || lastName !== initialValues.lastName, [firstName, lastName, initialValues])

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const sendData: Props['initialValues'] = { firstName, lastName }

    submit(sendData, {
      method: 'patch',
      action: '/settings/update/basics',
    })
  }

  const removeAvatar = async () => {
    if (!avatarUrl) {
      return
    }

    showDelete({
      loading: true,
      title: 'Deleting avatar',
      message: 'Please wait',
      autoClose: false,
      disallowClose: true,
    })

    const path = avatarUrl.split('s3.amazonaws.com/')[1]

    try {
      await client(`file/avatar?path=${path}`, { method: 'DELETE' })
      setAvatar(null)
      setAvatarUrl('')
      updateDelete({ title: 'Success', message: 'Settings updated' })
    } catch (error) {
      updateDelete({ title: 'Error', message: 'Something went wrong' })
    }
  }

  const setAvatar = async (file: File | null) => {
    if (!file) {
      return
    }
    const formData = new FormData()
    formData.append('avatar', file, file.name)

    showSet({
      loading: true,
      title: 'Uploading avatar',
      message: 'Please wait',
      autoClose: false,
      disallowClose: true,
    })

    try {
      const data = await client('file/avatar', { data: formData, method: 'POST' })
      setAvatarUrl(data.url)
      updateSet({ title: 'Success', message: 'Settings updated' })
    } catch (error) {
      updateSet({ title: 'Error', message: 'Something went wrong' })
    }
  }

  useEffect(() => {
    if (data && !data.ok) {
      show({ title: 'Error', message: 'Something went wrong' })
    } else if (data?.ok) {
      show({ title: 'Success', message: 'Settings updated' })
    }
  }, [data])

  return (
    <Paper shadow="sm" p="md" title="User basics">
      <Title order={4} mb="md">
        Basics:
      </Title>

      <Stack justify="center" align="stretch">
        <div className={classes.avatarWrapper}>
          <Avatar className={classes.rounded} src={avatarUrl || initialValues.avatar} radius="xl" size={120} alt={`${initialValues.firstName} ${initialValues.lastName}`} />
          <Menu withArrow withinPortal>
            <Menu.Target>
              <ActionIcon className={classes.avatarEditIcon} variant="filled" color="blue">
                <IconPencil size={16} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item component="div" px={0} py={5} closeMenuOnClick={false}>
                <FileButton name="avatar" onChange={setAvatar} accept="image/png,image/jpeg">
                  {(props) => (
                    <Button {...props} leftIcon={<IconUpload size={14} />} size="xs" variant="subtle" compact>
                      Upload
                    </Button>
                  )}
                </FileButton>
              </Menu.Item>
              <Menu.Item component="div" px={0} py={5}>
                <Button onClick={removeAvatar} leftIcon={<IconTrash size={14} />} size="xs" color="red" variant="subtle" disabled={!avatarUrl} compact>
                  Remove
                </Button>
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>

        <form onSubmit={submitHandler}>
          <TextInput className={className} label="Firstname" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
          <TextInput className={className} label="Lastname" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />

          <Group position="right" mt="md">
            <Button variant="outline" mt="md" type="submit" disabled={!isActuallySomethingChanged}>
              Update
            </Button>
          </Group>
        </form>
      </Stack>
    </Paper>
  )
}
