import { createStyles, Text, Avatar, Group, TypographyStylesProvider, Paper } from '@mantine/core'
import TimeAgo from 'timeago-react'

const useStyles = createStyles((theme) => ({
  comment: {
    padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`,
  },

  body: {
    paddingLeft: 54,
    paddingTop: theme.spacing.sm,
    fontSize: theme.fontSizes.sm,
  },

  content: {
    '& > p:last-child': {
      marginBottom: 0,
    },
  },
}))

interface CommentHtmlProps {
  postedAt?: string
  body: string
  author: {
    firstName: string
    lastName?: string
    avatar?: string
  }
}

export const Comment: React.FC<CommentHtmlProps> = ({ postedAt, body, author }) => {
  const { classes } = useStyles()
  const fullName = author.lastName ? `${author.firstName} ${author.lastName}` : author.firstName

  return (
    <Paper withBorder radius="md" className={classes.comment}>
      <Group>
        <Avatar src={author.avatar || '/user-placeholder.png'} alt={fullName} radius="xl" />
        <div>
          <Text size="sm">{fullName}</Text>
          <Text size="xs" color="dimmed">
            {postedAt ? <TimeAgo datetime={postedAt} locale="en_US" /> : 'Just now'}
          </Text>
        </div>
      </Group>
      <TypographyStylesProvider className={classes.body}>
        <div className={classes.content}>{body}</div>
      </TypographyStylesProvider>
    </Paper>
  )
}
