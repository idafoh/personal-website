import { useCallback, useState } from 'react'
import { ActionFunction, LoaderFunction, useFetcher, useLoaderData } from 'react-router-dom'
import { Container } from '@mantine/core'
import { PostsTable } from '~/components/Posts/Table'
import { usePageTitle } from '~/hooks/usePageTitle'
import { DeleteModal } from '~/components/Posts/DeleteModal'
import { client } from '~/lib/api-client'
import { getToken } from '~/lib/auth-provider'

export const AllPostsPage: React.FC = () => {
  const { submit } = useFetcher()
  const data = useLoaderData() as any
  usePageTitle('All Posts')

  const [deleting, setDeleting] = useState(false)
  const [deletingId, setDeletingId] = useState(0)
  const [deletingTitle, setDeletingTitle] = useState('')

  const onDeleteClick = useCallback((id: number, title: string) => {
    setDeleting(true)
    setDeletingId(id)
    setDeletingTitle(title)
  }, [])

  const afterDelete = useCallback(() => {
    setDeleting(false)
    submit({ action: 'delete', id: deletingId.toString() }, { method: 'delete', action: '/posts/all' })
  }, [deletingId])

  return (
    <>
      <Container sx={{ maxWidth: 'unset' }} p="md">
        <PostsTable onDelete={onDeleteClick} data={Array.isArray(data) ? data : []} />
      </Container>
      <DeleteModal opened={deleting} onClose={() => setDeleting(false)} id={deletingId} title={deletingTitle} deleteCallback={afterDelete} />
    </>
  )
}

export const loader: LoaderFunction = async () => {
  const token = await getToken()
  if (!token) return null

  try {
    return await client('posts/my', { token })
  } catch (error) {
    return null
  }
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const action = formData.get('action') as string
  const id = formData.get('id') as string

  if (action === 'delete') {
    try {
      await client(`posts/my/${id}`, {
        token: await getToken(),
        method: 'DELETE',
      })
      return { ok: true }
    } catch (error) {
      return { ok: false }
    }
  }
}
