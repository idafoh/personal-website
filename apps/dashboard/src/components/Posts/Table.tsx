import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { createStyles, Table, ScrollArea, UnstyledButton, Group, Text, Center, TextInput, Anchor, ActionIcon, Badge, Paper } from '@mantine/core'
import { keys } from '@mantine/utils'
import { IconSelector, IconChevronDown, IconChevronUp, IconSearch, IconPencil, IconTrash } from '@tabler/icons'

const formatter = Intl.NumberFormat('en-US', { notation: 'compact' })
const mainDomain = import.meta.env.VITE_APP_DOMAIN.replace('dashboard.', '')

const useStyles = createStyles((theme, _params, getRef) => ({
  header: {
    position: 'sticky',
    top: 0,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    transition: 'box-shadow 150ms ease',

    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[2]}`,
    },
  },

  th: {
    padding: '0 !important',
  },

  control: {
    width: '100%',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  icon: {
    width: 21,
    height: 21,
    borderRadius: 21,
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}))

interface RowData {
  id: number
  title: string
  slug: string
  published: boolean
  views: number
  likeCount: number
}

interface TableSortProps {
  data: RowData[]
  onDelete(id: number, title: string): void
  noEdit?: boolean
}

interface ThProps {
  children: React.ReactNode
  reversed: boolean
  sorted: boolean
  onSort(): void
}

const Th: React.FC<ThProps> = ({ children, reversed, sorted, onSort }) => {
  const { classes } = useStyles()
  const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector

  return (
    <th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group position="apart">
          <Text weight={500} size="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size={14} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </th>
  )
}

export const PostsTable: React.FC<TableSortProps> = ({ data, onDelete, noEdit }) => {
  const { classes, cx } = useStyles()

  const [search, setSearch] = useState('')
  const [sortedData, setSortedData] = useState(data)
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null)
  const [reverseSortDirection, setReverseSortDirection] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    setSortedData(data)
  }, [data])

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false
    setReverseSortDirection(reversed)
    setSortBy(field)
    setSortedData(sortData(data, { sortBy: field, reversed, search }))
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget
    setSearch(value)
    setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection, search: value }))
  }

  const rows = sortedData.map((row) => (
    <tr key={row.id}>
      <td>
        {noEdit ? (
          <Anchor<'a'> href={row.published ? `https://${mainDomain}/blog/${row.slug}` : `https://${mainDomain}`} target="_blank" rel="noreferrer noopener">
            {row.title}
          </Anchor>
        ) : (
          <Anchor component={Link} to={`/posts/${row.slug}`}>
            {row.title}
          </Anchor>
        )}
      </td>
      <td>{formatter.format(row.views)}</td>
      <td>{formatter.format(row.likeCount)}</td>
      <td>{row.published ? <Badge color="green">Published</Badge> : <Badge color="orange">Draft</Badge>}</td>
      <td>
        <Group spacing={0} position="right">
          {!noEdit && (
            <ActionIcon component={Link} to={`/posts/${row.slug}`}>
              <IconPencil size={16} stroke={1.5} />
            </ActionIcon>
          )}
          <ActionIcon color="red" onClick={() => onDelete(row.id, row.title)}>
            <IconTrash size={16} stroke={1.5} />
          </ActionIcon>
        </Group>
      </td>
    </tr>
  ))

  return (
    <>
      <TextInput placeholder="Search by any field" mb="md" icon={<IconSearch size={14} stroke={1.5} />} value={search} onChange={handleSearchChange} />
      <ScrollArea style={{ height: '80vh' }} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
        <Paper shadow="sm" p="lg">
          <Table horizontalSpacing="md" verticalSpacing="xs" sx={{ tableLayout: 'fixed', minWidth: 700 }}>
            <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
              <tr>
                <Th sorted={sortBy === 'id'} reversed={reverseSortDirection} onSort={() => setSorting('id')}>
                  Title
                </Th>
                <Th sorted={sortBy === 'views'} reversed={reverseSortDirection} onSort={() => setSorting('views')}>
                  Views
                </Th>
                <Th sorted={sortBy === 'likeCount'} reversed={reverseSortDirection} onSort={() => setSorting('likeCount')}>
                  Likes
                </Th>
                <Th sorted={sortBy === 'published'} reversed={reverseSortDirection} onSort={() => setSorting('published')}>
                  Published
                </Th>
                <th />
              </tr>
            </thead>
            <tbody>
              {rows.length > 0 ? (
                rows
              ) : (
                <tr>
                  <td colSpan={5}>
                    <Text weight={500} align="center">
                      Nothing found
                    </Text>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Paper>
      </ScrollArea>
    </>
  )
}

function filterData(data: RowData[], search: string) {
  const query = search.toLowerCase().trim()
  return data.filter((item) => keys(data[0]).some((key) => item[key].toString().toLowerCase().includes(query)))
}

function sortData(data: RowData[], payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }) {
  const { sortBy } = payload

  if (!sortBy) {
    return filterData(data, payload.search)
  }

  return filterData(
    [...data].sort((a, b) => {
      const v1 = a[sortBy]
      const v2 = b[sortBy]

      if (typeof v1 === 'number' && typeof v2 === 'number') {
        if (payload.reversed) return v2 > v1 ? 1 : 0
        return v2 < v1 ? 1 : 0
      }

      if (typeof v1 === 'boolean' && typeof v2 === 'boolean') {
        if (payload.reversed) return v2 ? 1 : 0
        return v1 ? 1 : 0
      }

      if (typeof v1 === 'string' && typeof v2 === 'string') {
        if (payload.reversed) return v2.localeCompare(v1)
        return v1.localeCompare(v2)
      }

      return 0
    }),
    payload.search
  )
}
