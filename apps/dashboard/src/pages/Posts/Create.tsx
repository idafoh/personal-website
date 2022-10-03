import { ActionFunction, redirect } from 'react-router-dom'
import { Container } from '@mantine/core'
import { startNavigationProgress, completeNavigationProgress } from '@mantine/nprogress'
import { SinglePost } from '~/components/Posts/SinglePost'
import { usePageTitle } from '~/hooks/usePageTitle'
import { client } from '~/lib/api-client'
import { getToken } from '~/lib/auth-provider'

export const CreatePostPage: React.FC = () => {
  usePageTitle('Create Post')

  return (
    <Container sx={{ maxWidth: 'unset', width: '75vw' }} p="md">
      <SinglePost />
    </Container>
  )
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const title = formData.get('title') as string
  const content = formData.get('content') as string
  if (!title || !content) {
    return { ok: false, message: 'Empty content' }
  }
  // we're make sure that the title and content are not empty
  // cuz we validated on component
  const data = { title, content }

  try {
    startNavigationProgress()
    await client('posts', {
      method: 'POST',
      data,
      token: await getToken(),
    })
    return redirect('/posts/all')
  } catch (error) {
    return { ok: false }
  } finally {
    completeNavigationProgress()
  }
}
