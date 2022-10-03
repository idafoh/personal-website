import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import { Container, Pagination, Stack } from '@mantine/core'
import chunk from 'lodash.chunk'
import { Title } from '../components/title'
import { BlogPostCard } from '../components/blog/card'
import { Breadcrumbs } from '../components/breadcrumbs'

interface Post {
  id: number
  title: string
  slug: string
  excerpt: string
  views: number
  likeCount: number
  author: { firstName: string; lastName?: string }
  comments: number
}

interface PageProps {
  posts: Post[]
  total: number
}

const BlogPage: NextPage<PageProps> = ({ posts }) => {
  const [activePage, setPage] = useState(1)
  const data = chunk(posts, 5)

  const items =
    data.length > 0 &&
    data[activePage - 1].map((post) => (
      <BlogPostCard
        key={post.id}
        excerpt={post.excerpt}
        link={`/blog/${post.slug}`}
        title={post.title}
        author={post.author.lastName ? `${post.author.firstName} ${post.author.lastName}` : post.author.firstName}
        views={post.views}
        comments={post.comments}
      />
    ))

  return (
    <>
      <Head>
        <title>Blog</title>
        <meta name="description" content="My blog" />
      </Head>

      <Container>
        <Breadcrumbs items={[{ title: 'Blog', current: true }]} />
        <Title order={2} my={30} size="h1" weight={900} align="center">
          Blog
        </Title>

        {posts.length === 0 ? (
          <Title order={3} my={30} size="h2" weight={900} align="center">
            No posts yet
          </Title>
        ) : (
          items
        )}

        {posts.length > 0 && (
          <Stack align="center" my="xl">
            <Pagination page={activePage} onChange={setPage} total={data.length} />
          </Stack>
        )}
      </Container>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/posts/feed`

  try {
    // TODO: better way to handle this
    const response = await fetch(`${url}?limit=100`)

    if (!response.ok) {
      throw new Error('Something went wrong!')
    }

    const { posts, total } = await response.json()

    return {
      props: { posts, total },
      revalidate: 60 * 5,
    }
  } catch (error: any) {
    console.log(error)

    console.log('[/blog] ERROR', error.message)
  }

  return {
    props: { posts: [], total: 0 },
    revalidate: 60 * 5,
  }
}

export default BlogPage
