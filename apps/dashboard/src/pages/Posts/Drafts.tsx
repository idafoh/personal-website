import { useCallback, useState } from 'react'
import { LoaderFunction, useFetcher, useLoaderData } from 'react-router-dom'
import { Container } from '@mantine/core'
import { PostsTable } from '~/components/Posts/Table'
import { usePageTitle } from '~/hooks/usePageTitle'
import { DeleteModal } from '~/components/Posts/DeleteModal'
import { client } from '~/lib/api-client'
import { getToken } from '~/lib/auth-provider'

export const DraftsPage: React.FC = () => {
  const { submit } = useFetcher()
  const data = useLoaderData() as any
  usePageTitle('Drafts')

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
  return client('posts/my?published=false', { token: await getToken() })
}
