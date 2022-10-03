import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { createStyles, Container, Title, Text, Button, Group } from '@mantine/core'
import { Illustration } from '../components/illustration'

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: 100,
    paddingBottom: 120,
  },

  inner: {
    position: 'relative',
  },

  image: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    zIndex: 0,
    opacity: 0.75,
  },

  content: {
    paddingTop: 220,
    position: 'relative',
    zIndex: 1,

    [theme.fn.smallerThan('sm')]: {
      paddingTop: 120,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 38,

    [theme.fn.smallerThan('sm')]: {
      fontSize: 32,
    },
  },

  description: {
    maxWidth: 540,
    margin: 'auto',
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl * 1.5,
  },
}))

const NothingFound: NextPage = () => {
  const { classes } = useStyles()

  return (
    <Container className={classes.root}>
      <Head>
        <title>404</title>
        <meta name="description" content="Page not found" />
      </Head>

      <div className={classes.inner}>
        <Illustration className={classes.image} />
        <div className={classes.content}>
          <Title className={classes.title}>You have found a secret place</Title>
          <Text color="dimmed" size="lg" align="center" className={classes.description}>
            Unfortunately, this is only a 404 page. You may have mistyped the address, or the page has been moved to another URL.
          </Text>
          <Group position="center">
            <Link href="/" passHref>
              <Button size="md">Take me back to home page</Button>
            </Link>
          </Group>
        </div>
      </div>
    </Container>
  )
}

export default NothingFound
