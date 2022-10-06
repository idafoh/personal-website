import { Link } from 'react-router-dom'
import { Navbar, Group, Code, ScrollArea, createStyles, Menu, Title } from '@mantine/core'
import { ConfirmLogoutModal } from 'ui'
import { IconGauge, IconAdjustments, IconNews, IconUser, IconLogout } from '@tabler/icons'
import { UserButton } from './UserButton'
import { LinksGroup } from './NavbarLinksGroup'
import { useClickOutside, useToggle } from '@mantine/hooks'
import { useAuth } from '~/context/auth'

const navbarData = [
  { label: 'Dashboard', icon: IconGauge, link: '/dashboard' },
  {
    label: 'Posts',
    icon: IconNews,
    links: [
      { label: 'Published', link: '/posts/published' },
      { label: 'Drafts', link: '/posts/drafts' },
      { label: 'All', link: '/posts/all' },
      { label: 'Create One', link: '/posts/create' },
    ],
  },
  { label: 'Users', icon: IconUser, link: '/users' },
  { label: 'Settings', icon: IconAdjustments, link: '/settings' },
]
const onlyAdminItemIndexes = [0, 2]

const useStyles = createStyles((theme) => ({
  navbar: {
    position: 'fixed',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    padding: theme.spacing.md,
    paddingBottom: 0,
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
  },

  links: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
  },

  linksInner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },

  footer: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
  },
}))

interface Props {
  image?: string
  name?: string
  email?: string
}

export const NavbarNested: React.FC<Props> = ({ name, email, image }) => {
  const { classes } = useStyles()
  const { role, logout } = useAuth()
  const [opened, toggleMenu] = useToggle([false, true])
  const [loggingOut, toggleLoggingOut] = useToggle([false, true])
  const clickOutsideRef = useClickOutside(() => toggleMenu(false))
  const isAdmin = role === 'admin'
  // filter out private links for non-admin users
  const nData = isAdmin ? navbarData : navbarData.filter((_, index) => !onlyAdminItemIndexes.includes(index))
  const links = nData.map((item, index) => <LinksGroup {...item} key={item.label} />)

  return (
    <>
      <Navbar className={classes.navbar} width={{ sm: 300 }}>
        <Navbar.Section className={classes.header}>
          <Group position="apart">
            <Title order={2} size="h2">
              Dashboard
            </Title>
            <Code sx={{ fontWeight: 700 }}>v{APP_VERSION}</Code>
          </Group>
        </Navbar.Section>

        <Navbar.Section grow className={classes.links} component={ScrollArea}>
          <div className={classes.linksInner}>{links}</div>
        </Navbar.Section>

        <Menu shadow="md" width={295} opened={opened} onChange={toggleMenu} position="top" withArrow>
          <Menu.Target>
            <Navbar.Section ref={clickOutsideRef} className={classes.footer} onClick={() => toggleMenu(true)}>
              <UserButton image={image || '/user-placeholder.png'} name={name || 'User'} email={email || 'user@example.com'} active={opened} />
            </Navbar.Section>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>Account</Menu.Label>

            <Menu.Item component={Link} to="/settings" icon={<IconAdjustments size={14} />}>
              Settings
            </Menu.Item>
            <Menu.Item color="red" icon={<IconLogout size={14} />} onClick={() => toggleLoggingOut(true)}>
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Navbar>

      <ConfirmLogoutModal opened={loggingOut} onClose={() => toggleLoggingOut(false)} logoutFn={logout} />
    </>
  )
}
