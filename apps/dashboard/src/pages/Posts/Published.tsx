import { useCallback, useState } from 'react'
import { LoaderFunction, useFetcher, useLoaderData } from 'react-router-dom'
import { Container } from '@mantine/core'
import { DeleteModal } from '~/components/Posts/DeleteModal'
import { PostsTable } from '~/components/Posts/Table'
import { usePageTitle } from '~/hooks/usePageTitle'
import { getToken } from '~/lib/auth-provider'
import { client } from '~/lib/api-client'

export const PublishedPostsPage: React.FC = () => {
  const { submit } = useFetcher()
  const data = useLoaderData() as any
  usePageTitle('Published Posts')

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
        <PostsTable data={Array.isArray(data) ? data : []} onDelete={onDeleteClick} />
      </Container>
      <DeleteModal opened={deleting} onClose={() => setDeleting(false)} id={deletingId} title={deletingTitle} deleteCallback={afterDelete} />
    </>
  )
}

export const loader: LoaderFunction = async () => {
  const token = await getToken()
  if (!token) return null

  try {
    return await client('posts/my?published=true', { token })
  } catch (error) {
    return null
  }
}
