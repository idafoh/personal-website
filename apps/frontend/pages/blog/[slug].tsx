import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { SinglePost } from '../../components/blog/single'

export interface Post {
  id: number
  title: string
  slug: string
  content: string
  likeCount: number
  views: number
  createdAt: string
  updatedAt: string
  author: { firstName: string; lastName: string; avatar?: string }
  comments: {
    id: number
    body: string
    user: Post['author']
    createdAt: string
    updatedAt: string
  }[]
  likes: any[]
}

interface PageProps {
  post: Post
}

const BlogPostPage: NextPage<PageProps> = ({ post }) => {
  return (
    <>
      <Head>
        <title>Blog</title>
        <meta name="description" content="My blog" />
      </Head>

      <SinglePost post={post} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.params?.slug
  const url = `${process.env.NEXT_PUBLIC_API_URL}/posts/${slug}`

  if (!slug) {
    return { notFound: true }
  }

  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error('Something went wrong!')
    }

    const post = (await response.json()) as Post

    return {
      props: { post },
    }
  } catch (error: any) {
    console.log('[/blog/[post]] ERROR', error.message)
    return { notFound: true }
  }
}

export default BlogPostPage
