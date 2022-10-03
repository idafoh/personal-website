import { Icon } from '@iconify/react'
import { NextLink } from '@mantine/next'
import { Card, Text, Group, Center, createStyles } from '@mantine/core'
import { Title } from '../title'

const useStyles = createStyles((theme) => ({
  card: {
    width: 960 - 64,
    marginBottom: 15,
    [theme.fn.smallerThan('sm')]: {
      width: '90%',
      marginInline: 'auto',
    },
  },
  bodyText: {
    color: theme.colors.dark[2],
    marginLeft: 7,
  },
}))

interface Props {
  link: string
  title: string
  excerpt: string
  author: string
  views: number
  comments: number
}

export const BlogPostCard: React.FC<Props> = ({ excerpt, title, author, views, comments, link }) => {
  const { classes, theme } = useStyles()

  return (
    <Card className={classes.card} p="lg" shadow="lg" radius="md" component={NextLink} href={link}>
      <Group position="apart">
        <Title order={3}>{title}</Title>
        <Text size="sm" color="dimmed">
          {author}
        </Text>
      </Group>

      <Text size="md" color="dimmed" my="lg">
        {excerpt}...
      </Text>

      <Group position="right" spacing="lg">
        <Center>
          <Icon icon="tabler:eye" stroke="1.5" color={theme.colors.dark[2]} />
          <Text size="sm" className={classes.bodyText}>
            {views}
          </Text>
        </Center>
        <Center>
          <Icon icon="tabler:message-circle" stroke="1.5" color={theme.colors.dark[2]} />
          <Text size="sm" className={classes.bodyText}>
            {comments}
          </Text>
        </Center>
      </Group>
    </Card>
  )
}
