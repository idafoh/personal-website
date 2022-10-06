import { Container } from '@mantine/core'
import { useCallback, useState } from 'react'
import { ActionFunction, LoaderFunction, redirect, useFetcher, useLoaderData } from 'react-router-dom'
import { DeleteModal } from '~/components/Posts/DeleteModal'
import { PostsTable } from '~/components/Posts/Table'
import { usePageTitle } from '~/hooks/usePageTitle'
import { client } from '~/lib/api-client'
import { getToken } from '~/lib/auth-provider'

export const AllPostsPage: React.FC = () => {
  usePageTitle('All Posts [admin]')
  const { submit } = useFetcher()
  const data = useLoaderData() as any

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
    submit({ id: deletingId.toString() }, { method: 'delete', action: '/all-posts' })
  }, [deletingId])

  return (
    <>
      <Container sx={{ maxWidth: 'unset' }} p="md">
        <PostsTable onDelete={onDeleteClick} data={Array.isArray(data) ? data : []} noEdit />
      </Container>

      <DeleteModal opened={deleting} onClose={() => setDeleting(false)} id={deletingId} title={deletingTitle} deleteCallback={afterDelete} />
    </>
  )
}

export const loader: LoaderFunction = async () => {
  const token = await getToken()
  if (!token) return null

  try {
    return await client('posts', { token })
  } catch (error) {
    return null
  }
}

// this action only for delete
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const id = formData.get('id') as string

  try {
    await client(`posts/${id}`, {
      token: await getToken(),
      method: 'DELETE',
    })
    return redirect('/all-posts?deleted=true')
  } catch (error) {
    return { ok: false }
  }
}
