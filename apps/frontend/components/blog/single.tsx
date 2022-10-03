import { Avatar, Button, createStyles, Divider, Group, Stack, Text, Textarea } from '@mantine/core'
import { useState } from 'react'
import readingTime from 'reading-time'
import { Comment } from './comment'
import { Breadcrumbs } from '../breadcrumbs'
import { Post } from '../../pages/blog/[slug]'
import { useAuth } from '../../context/auth'
import { RequestLoginModal } from '../request-login-modal'
import { Title } from '../title'
import { useClient } from '../../hooks/use-client'
import { formatDate } from '../../lib/date-format'

interface Props {
  post: Post
}

const useStyles = createStyles((theme) => {
  const imageResizeRatio = 960 / 1024

  return {
    content: {
      maxWidth: 960,
      margin: '0 auto',

      [theme.fn.smallerThan('xs')]: {
        padding: '0 20px',

        '& img': {
          width: '100%',
        },
      },
    },

    info: {
      position: 'relative',
      fontSize: theme.fontSizes.md,
      '& > div:first-of-type': { marginRight: 'auto' },

      [theme.fn.smallerThan('xs')]: {
        fontSize: theme.fontSizes.sm,
        gap: 1,
        '& > div:first-of-type': { marginRight: 'unset' },
      },
    },

    infoAvatar: {
      [theme.fn.smallerThan('xs')]: {
        position: 'absolute',
        left: 0,
        top: 0,
      },
    },

    commentArea: {
      width: '94%',
      [theme.fn.smallerThan('xs')]: {
        width: '100%',
      },
    },

    commentAvatar: {
      [theme.fn.smallerThan('xs')]: {
        display: 'none',
      },
    },

    image: {
      display: 'block',
      maxWidth: 1024 * imageResizeRatio,
      maxHeight: 682 * imageResizeRatio,
    },
  }
})

export const SinglePost: React.FC<Props> = ({ post }) => {
  const client = useClient()
  const { classes } = useStyles()
  const { user, token } = useAuth()
  const [comments, setComments] = useState(post.comments)
  const [comment, setComment] = useState('')
  const [errorMessageComment, setErrorMessageComment] = useState('')
  const [modalOpened, setModalOpened] = useState(false)
  const authorFullName = post.author.lastName ? `${post.author.firstName} ${post.author.lastName}` : post.author.firstName

  const handleCommentFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    if (!user) {
      setModalOpened(true)
      e.currentTarget.blur()
    }
  }

  const submitComment = async () => {
    if (!comment.length || !user) {
      setErrorMessageComment('Comment cannot be empty')
      setTimeout(() => setErrorMessageComment(''), 3000)
      return
    }

    try {
      await client(`posts/${post.id}/comment`, {
        token,
        data: { body: comment },
      })

      const [firstName, lastName] = user.fullName.split(' ')
      setComment('')
      setComments((comments) => [
        ...comments,
        {
          id: comments.length + 1,
          body: comment,
          user: { id: user.id, firstName, lastName, avatar: user.avatar },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ])
    } catch (error) {
      console.log('Comment error', error)
    }
  }

  return (
    <div key={post.id} className={classes.content}>
      <Breadcrumbs
        items={[
          { title: 'Blog', href: '/blog' },
          { title: post.title, current: true },
        ]}
      />

      <Title mt={35} mb="xl">
        {post.title}
      </Title>

      <Group className={classes.info} position="right" align="flex-end" spacing="xs" mb="xs">
        <Group spacing="xs">
          <Avatar className={classes.infoAvatar} src={post.author.avatar || '/user-placeholder.png'} size="md" radius="xl" />

          <Text color="dimmed">
            {authorFullName} / {formatDate(post.createdAt)}
          </Text>
        </Group>
        <Text color="dimmed">
          {readingTime(post.content).text} • {post.views.toLocaleString('en-US')} views
        </Text>
      </Group>

      <Divider />

      <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }} />

      <Divider />

      <Stack spacing="md" my="md">
        <Title order={3}>Comments</Title>
        <Group position="apart">
          <Avatar className={classes.commentAvatar} src={user?.avatar || '/user-placeholder.png'} alt={'fullName'} radius="xl" />
          <Textarea
            className={classes.commentArea}
            onFocus={handleCommentFocus}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            error={errorMessageComment}
            placeholder="Leave a comment"
          />
        </Group>
        {user && (
          <Group position="right">
            <Button onClick={submitComment}>Comment</Button>
          </Group>
        )}
        {comments.length > 0 && comments.map((comment) => <Comment key={comment.id} author={comment.user} body={comment.body} postedAt={comment.createdAt} />)}
      </Stack>

      <RequestLoginModal opened={modalOpened} onClose={() => setModalOpened(false)} />
    </div>
  )
}
