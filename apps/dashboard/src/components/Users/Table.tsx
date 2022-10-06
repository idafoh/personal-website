import { Avatar, Badge, Table, Group, Text, ActionIcon, Anchor, ScrollArea, useMantineTheme } from '@mantine/core'

interface Props {
  data: {
    id: number
    avatar: string
    username: string
    firstName: string
    lastName: string
    role: 'admin' | 'user'
    email: string
  }[]
}

const roleColors: Record<string, string> = {
  user: 'blue',
  admin: 'pink',
}

export const UsersTable: React.FC<Props> = ({ data }) => {
  const theme = useMantineTheme()

  const rows = data.map((item) => (
    <tr key={item.id}>
      <td>
        <Group spacing="sm">
          <Avatar size={30} src={item.avatar || '/user-placeholder.png'} radius={30} />
          <Text size="sm" weight={500}>
            {item.firstName} {item.lastName}
          </Text>
        </Group>
      </td>

      <td>
        <Text>{item.username}</Text>
      </td>

      <td>
        <Badge color={roleColors[item.role.toLowerCase()]} variant={theme.colorScheme === 'dark' ? 'light' : 'outline'}>
          {item.role}
        </Badge>
      </td>
      <td>
        <Anchor<'a'> size="sm" href={`mailto:${item.email}`}>
          {item.email}
        </Anchor>
      </td>
    </tr>
  ))

  return (
    <ScrollArea>
      <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
        <thead>
          <tr>
            <th>User</th>
            <th>Username</th>
            <th>Role</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={3}>
                <Text weight={500} align="center">
                  Nothing found
                </Text>
              </td>
            </tr>
          ) : (
            rows
          )}
        </tbody>
      </Table>
    </ScrollArea>
  )
}
