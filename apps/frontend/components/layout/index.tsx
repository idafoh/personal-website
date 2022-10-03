import { HeaderResponsive as Header } from './header'
import { Footer } from './footer'

const links = [
  {
    link: '/',
    label: 'Home',
  },
  {
    link: '/blog',
    label: 'Blog',
  },
  {
    link: '/about',
    label: 'About',
  },
  {
    link: '/contact',
    label: 'Contact',
  },
]

const socialAccounts = [
  {
    link: 'https://twitter.com/abat_dauletbaev',
    icon: 'tabler:brand-twitter',
  },
  {
    link: 'https://youtube.com/channel/UCEQv97XiI5lIMNDdmWlpoEA',
    icon: 'tabler:brand-youtube',
  },
  {
    link: 'https://instagram.com/abat_dauletbaev',
    icon: 'tabler:brand-instagram',
  },
  {
    link: 'https://github.com/dauletbaev',
    icon: 'tabler:brand-github',
  },
  {
    link: 'https://linkedin.com/in/abat-dauletbaev-3b2654211',
    icon: 'tabler:brand-linkedin',
  },
  {
    link: 'https://facebook.com/dauletbaev',
    icon: 'tabler:brand-facebook',
  },
]

interface LayoutProps {
  children: React.ReactNode
  activePath: string
}

export default function Layout({ children, activePath }: LayoutProps) {
  return (
    <>
      <Header links={links} activePath={activePath} />
      <main>{children}</main>
      <Footer links={links} socialAccounts={socialAccounts} />
    </>
  )
}
