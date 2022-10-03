import type { GetServerSideProps, NextPage } from 'next'
import crypto from 'crypto'
import Head from 'next/head'
import { Hero } from '../components/hero'

interface Props {
  gravatar: string
  cv: string
  age: number
}

const Home: NextPage<Props> = ({ gravatar, cv, age }) => {
  return (
    <div>
      <Head>
        <title>Home</title>
        <meta name="description" content="Home page" />
      </Head>

      <main>
        <Hero age={age} imageSrc={gravatar} imageAlt="Me" cvUrl={cv} />
      </main>
    </div>
  )
}

export const getStaticProps: GetServerSideProps = async () => {
  const age = new Date().getFullYear() - parseInt(process.env.YEAR_OF_BIRTH, 10)
  const HASH = crypto.createHash('md5').update(process.env.MY_EMAIL).digest('hex')
  const imageSrc = `https://www.gravatar.com/avatar/${HASH}`

  return {
    props: {
      gravatar: imageSrc,
      cv: process.env.NEXT_PUBLIC_CV_LINK,
      age,
    },
  }
}

export default Home
