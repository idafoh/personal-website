import '../styles/globals.css'
import type { GetStaticProps } from 'next'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import PlausibleProvider from 'next-plausible'
import { MantineProvider, ColorScheme, ColorSchemeProvider } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import { NotificationsProvider } from '@mantine/notifications'

import Layout from '../components/layout'
import { AuthProvider } from '../context/auth'

type IAppProps = AppProps & { domain: string }

const App: React.FC<IAppProps> = ({ Component, pageProps, domain }) => {
  const router = useRouter()
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'theme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  })
  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark')
    setColorScheme(nextColorScheme)
  }

  return (
    <>
      <Head>
        <title>Abat Dauletbaev</title>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <meta name="theme-color" content="#90cdf4" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <PlausibleProvider domain={domain}>
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
              colorScheme,
              colors: {
                dark: ['#d5d7e0', '#acaebf', '#8c8fa3', '#666980', '#4d4f66', '#34354a', '#2b2c3d', '#1d1e30', '#0c0d21', '#01010a'],
              },
            }}
          >
            <NotificationsProvider>
              <AuthProvider>
                <Layout activePath={router.pathname}>
                  <Component {...pageProps} />
                </Layout>
              </AuthProvider>
            </NotificationsProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      </PlausibleProvider>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => ({
  props: { domain: process.env.MY_DOMAIN },
})

export default App
