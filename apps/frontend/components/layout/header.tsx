import { Icon } from '@iconify/react'
import { createStyles, Header, Container, Group, Burger, Paper, Transition, ActionIcon } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import Link from 'next/link'
import { Avatar } from '../feature/avatar'
import { Theme } from '../feature/theme'

const HEADER_HEIGHT = 60

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    zIndex: 1,
  },

  dropdown: {
    position: 'absolute',
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },

    [theme.fn.smallerThan('sm')]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  actionGroup: {
    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'row-reverse',
      '& > a': {
        display: 'none',
      },
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },
}))

interface HeaderResponsiveProps {
  links: { link: string; label: string }[]
  activePath: string
}

export function HeaderResponsive({ links, activePath }: HeaderResponsiveProps) {
  const [opened, { toggle }] = useDisclosure(false)
  const { classes, cx } = useStyles()

  const items = links.map((link) => (
    <Link key={link.label} href={link.link}>
      <a className={cx(classes.link, { [classes.linkActive]: activePath === link.link })}>{link.label}</a>
    </Link>
  ))

  return (
    <Header height={HEADER_HEIGHT} className={classes.root}>
      <Container className={classes.header}>
        <Group spacing={5} className={classes.links}>
          {items}
        </Group>

        <Group className={classes.actionGroup}>
          <ActionIcon component="a" href="https://github.com/dauletbaev/abat.me" target="_blank" rel="noreferrer noopener" color="grape" variant="outline">
            <Icon icon="tabler:brand-github" fontSize={18} />
          </ActionIcon>
          <Theme switchVariant={false} />
          <Avatar />
        </Group>

        <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />

        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper style={styles} className={classes.dropdown} withBorder>
              {items}
            </Paper>
          )}
        </Transition>
      </Container>
    </Header>
  )
}
