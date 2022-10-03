import { useMemo, useState } from 'react'
import { useFetcher } from 'react-router-dom'
import { Button, Paper, Switch, Text, TextInput } from '@mantine/core'
import { RichTextEditor } from '@mantine/rte'

interface Props {
  initialData?: {
    id: number
    title: string
    content: string
    slug: string
    published: boolean
  }
}

export const SinglePost: React.FC<Props> = ({ initialData }) => {
  const isNewPost = !initialData
  const { Form, submit } = useFetcher()
  const [title, setTitle] = useState(initialData?.title || '')
  const [content, onContentChange] = useState(initialData?.content || '')
  const [published, setPublished] = useState(initialData?.published || false)

  const isSomethingActuallyChanged = useMemo(() => {
    if (isNewPost) {
      return title || content
    }

    return title !== initialData?.title || content !== initialData?.content || published !== initialData?.published
  }, [title, content, published])

  const handleChange = (type: 'title') => (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (type) {
      case 'title':
        setTitle(event.target.value)
        break
    }
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const isPublishStatusChanged = (initialData?.published !== published).toString()
    const data = {
      id: initialData?.id.toString() || '0',
      title,
      content,
      published: published ? 'on' : 'off',
      isPublishStatusChanged,
    }

    submit(data, {
      method: initialData ? 'patch' : 'post',
      action: `/posts/${initialData ? `${initialData.slug}/update` : 'create'}`,
    })
  }

  return (
    <Paper shadow="sm" p="md">
      <Form onSubmit={onSubmit}>
        <TextInput mb={30} sx={{ width: '40%' }} label="Title" name="title" value={title} onChange={handleChange('title')} />

        <Text>Content</Text>
        <RichTextEditor value={content} onChange={onContentChange} />

        {initialData && <Switch mt={30} name="published" label="Published" checked={published} onChange={(e) => setPublished(e.target.checked)} />}

        <Button sx={{ float: 'right' }} mt={30} type="submit" disabled={!isSomethingActuallyChanged}>
          {initialData ? 'Update' : 'Create'} post
        </Button>
      </Form>
    </Paper>
  )
}
