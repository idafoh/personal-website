import { RouterProvider } from 'react-router-dom'
import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { useHotkeys, useLocalStorage, useMediaQuery } from '@mantine/hooks'
import { isMobile } from 'react-device-detect'
import { NotificationsProvider } from '@mantine/notifications'
import { NavigationProgress } from '@mantine/nprogress'

import { GlobalProvider } from './context/global'
import { AuthProvider } from './context/auth'
import { router } from './router'
import { NotCompatibleDevice } from './components/NotCompatibleDevice'

export const App: React.FC = () => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'dashboard-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  })
  const toggleColorScheme = (value?: ColorScheme) => setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))
  const smallScreen = useMediaQuery('(max-width: 1190px)')

  useHotkeys([['mod+J', () => toggleColorScheme()]])

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider
        withCSSVariables
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme,
          colors: {
            dark: ['#d5d7e0', '#acaebf', '#8c8fa3', '#666980', '#4d4f66', '#34354a', '#2b2c3d', '#1d1e30', '#0c0d21', '#01010a'],
          },
        }}
      >
        <NavigationProgress />
        <NotificationsProvider>
          <GlobalProvider>
            <AuthProvider>{isMobile || smallScreen ? <NotCompatibleDevice /> : <RouterProvider router={router} />}</AuthProvider>
          </GlobalProvider>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}
