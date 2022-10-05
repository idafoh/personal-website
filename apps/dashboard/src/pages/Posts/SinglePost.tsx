import { ActionFunction, LoaderFunction, redirect, useLoaderData } from 'react-router-dom'
import { Container } from '@mantine/core'
import { startNavigationProgress, completeNavigationProgress } from '@mantine/nprogress'
import { SinglePost } from '~/components/Posts/SinglePost'
import { usePageTitle } from '~/hooks/usePageTitle'
import { client } from '~/lib/api-client'
import { getToken } from '~/lib/auth-provider'

export const SinglePostPage: React.FC = () => {
  const data = useLoaderData() as any

  usePageTitle(`Post: ${data.title}`)

  return (
    <Container sx={{ maxWidth: 'unset', width: '75vw', height: '93.5vh' }} p="md">
      <SinglePost initialData={data} />
    </Container>
  )
}

export const loader: LoaderFunction = async ({ params }) => {
  const token = await getToken()
  if (!token) return null

  try {
    return await client(`posts/my/${params.slug}`, { token })
  } catch (error) {
    return null
  }
}

export const action: ActionFunction = async ({ request, params }) => {
  // const slug = params.slug!
  const formData = await request.formData()
  const id = formData.get('id') as string
  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const unpushlish = formData.get('published') === 'off'
  const isPublishStatusChanged = formData.get('isPublishStatusChanged') === 'true'
  const isPostDataChanged = formData.get('isPostDataChanged') === 'true'

  const token = await getToken()
  const data = { title, content }

  if (isPostDataChanged) {
    try {
      startNavigationProgress()
      await client(`posts/my/${id}`, {
        token,
        method: 'PATCH',
        data,
      })
    } catch (error) {}
  }

  if (isPublishStatusChanged) {
    if (unpushlish) {
      startNavigationProgress()
      await client(`posts/unpublish/${id}`, {
        token,
        method: 'POST',
      })
    } else {
      startNavigationProgress()
      await client(`posts/publish/${id}`, {
        token,
        method: 'POST',
      })
    }
  }

  completeNavigationProgress()

  return redirect('/posts/all')
}
