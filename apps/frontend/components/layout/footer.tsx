import { createStyles, Container, Group, Anchor, ActionIcon } from '@mantine/core'
import { NextLink } from '@mantine/next'
import Link from 'next/link'
import { Icon } from '@iconify/react'

const useStyles = createStyles((theme) => ({
  footer: {
    borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]}`,
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column',
    },
  },

  links: {
    ['& a']: {
      color: '#868e96',
      textDecoration: 'none',
      fontSize: 14,
    },
    [theme.fn.smallerThan('xs')]: {
      marginTop: theme.spacing.md,
    },
  },
}))

interface FooterProps {
  links: { link: string; label: string }[]
  socialAccounts: { link: string; icon: string }[]
}

export function Footer({ links, socialAccounts }: FooterProps) {
  const { classes } = useStyles()
  const items = links.map((link) => (
    <Anchor component={Link} href={link.link} key={link.label} color="dimmed" size="sm">
      {link.label}
    </Anchor>
  ))

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Group className={classes.links}>{items}</Group>
        <Group spacing={0} className={classes.links} position="right" noWrap>
          {socialAccounts.map(({ icon, link }) => (
            <ActionIcon key={icon} size="lg" component={NextLink} href={link} target="_blank" rel="noopener noreferrer">
              <Icon icon={icon} stroke="1.5" fontSize={20} />
            </ActionIcon>
          ))}
        </Group>
      </Container>
    </div>
  )
}
