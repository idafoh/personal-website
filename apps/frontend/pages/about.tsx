import type { NextPage } from 'next'
import Head from 'next/head'
import { Anchor, Container, Text } from '@mantine/core'
import { MyFavouriteTools } from '../components/favourite-tools'
import { Title } from '../components/title'
import { Breadcrumbs } from '../components/breadcrumbs'
import { NowPlaying } from '../components/music/now-playing'
import { TopTracks } from '../components/music/top-tracks'

const AboutPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>About Me</title>
        <meta name="description" content="About me" />
      </Head>

      <Container className="blue-links">
        <Breadcrumbs items={[{ title: 'About', current: true }]} />
        <Title order={2} my={30} size="h1" weight={900} align="center">
          About me
        </Title>
        <Text>
          Hi. I&apos;m a web developer from republic of{' '}
          <Anchor<'a'> href="https://en.wikipedia.org/wiki/Karakalpakstan" target="_blank" rel="noopener noreferrer">
            Karakalpakstan
          </Anchor>{' '}
          (which is located in Central Asia Uzbekistan). I&apos;m currently working at{' '}
          <Anchor<'a'> href="https://www.datanimate.com/" target="_blank" rel="noopener noreferrer">
            Datanimate
          </Anchor>{' '}
          as a full stack web developer.
        </Text>
        <Text>
          I&apos;m a big fan of open source and I&apos;m always happy to contribute to the community. I&apos;m also a big fan of React and I&apos;m always happy to share my knowledge with others.
        </Text>
        <Text>My hobbies include reading, playing video games, watching movies and TV shows, and listening to music. I also like to travel and I&apos;m always happy to visit new places.</Text>
        <MyFavouriteTools />

        <TopTracks />
        <NowPlaying />
      </Container>
    </>
  )
}

export default AboutPage
