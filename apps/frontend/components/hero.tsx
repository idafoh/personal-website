import { createStyles, Container, Text, Button, Anchor } from '@mantine/core'
import Image from 'next/future/image'
import { Icon } from '@iconify/react'
import { usePlausible } from 'next-plausible'
import { useMediaQuery } from '@mantine/hooks'
import { Title } from './title'

const useStyles = createStyles((theme) => ({
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing.xl * 5,

    [theme.fn.smallerThan('md')]: {
      flexDirection: 'column-reverse',
      alignItems: 'center',
      gap: theme.spacing.xl,
      paddingTop: theme.spacing.xl,
      paddingBottom: theme.spacing.xl * 1.5,
    },
  },

  content: {
    maxWidth: 580,
    marginRight: theme.spacing.xl * 3,

    [theme.fn.smallerThan('md')]: {
      marginRight: 0,
    },
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 44,
    lineHeight: 1.2,
    fontWeight: 900,

    [theme.fn.smallerThan('xs')]: {
      fontSize: 28,
    },
  },

  imageWrapper: {
    width: 190,
    height: 190,
    textAlign: 'center',
  },

  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '50%',
    objectFit: 'cover',
  },

  downloadButton: {
    display: 'block',
    marginTop: 25,

    [theme.fn.smallerThan('md')]: {
      maxWidth: 220,
    },
  },
}))

interface Props {
  imageSrc: string
  imageAlt: string
  cvUrl: string
  age: number
}

export const Hero: React.FC<Props> = ({ imageSrc, imageAlt, cvUrl, age }) => {
  const { classes } = useStyles()
  const plausible = usePlausible()
  const md = useMediaQuery('(max-width: 992px)')

  const DownloadButton = (
    <Button
      className={classes.downloadButton}
      component="a"
      target="_blank"
      rel="noopener noreferrer"
      href={cvUrl}
      leftIcon={<Icon icon="tabler:file" fontSize={20} />}
      variant="light"
      color="cyan"
      mx="auto"
      onClick={() => plausible('check-cv')}
    >
      Check out my CV
    </Button>
  )

  return (
    <Container>
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title align={md ? 'center' : undefined} className={classes.title}>
            Abat Dauletbaev
          </Title>
          <Text align={md ? 'center' : undefined} color="dimmed" mt="md">
            Full Stack Web Developer
          </Text>
          <Text align={md ? 'center' : undefined} mt={30}>
            Hello there! I&apos;m Abat, {age} y.o. web developer from republic of{' '}
            <Anchor<'a'> href="https://en.wikipedia.org/wiki/Karakalpakstan" onClick={() => plausible('karakalpakstan')} target="_blank" rel="noopener noreferrer">
              Karakalpakstan
            </Anchor>{' '}
            (which is located in Central Asia Uzbekistan). I&apos;m passionate about building beautiful and fast web applications. I&apos;m currently working at{' '}
            <Anchor<'a'> href="https://www.datanimate.com/" onClick={() => plausible('current-job-link')} target="_blank" rel="noopener noreferrer">
              Datanimate
            </Anchor>{' '}
            as a full stack web developer.
            {md && DownloadButton}
          </Text>
        </div>

        <div className={classes.imageWrapper}>
          <Image src={`${imageSrc}?s=512`} className={classes.image} alt={imageAlt} height={250} width={250} priority />
          {!md && DownloadButton}
        </div>
      </div>
    </Container>
  )
}
