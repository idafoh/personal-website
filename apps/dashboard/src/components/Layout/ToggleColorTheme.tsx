import { ActionIcon, useMantineColorScheme } from '@mantine/core'
import { IconSun, IconMoonStars } from '@tabler/icons'

export const ToggleColorTheme = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  return (
    <ActionIcon variant="outline" size="lg" radius="md" color={dark ? 'yellow' : 'blue'} onClick={() => toggleColorScheme()} title="Toggle color scheme">
      {dark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
    </ActionIcon>
  )
}
