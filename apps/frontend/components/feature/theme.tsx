import { ActionIcon, Switch, useMantineColorScheme, useMantineTheme } from '@mantine/core'
import { Icon } from '@iconify/react'
import { useHotkeys } from '@mantine/hooks'

interface Props {
  switchVariant?: boolean
}

const title = 'Toggle color scheme'

export const Theme: React.FC<Props> = ({ switchVariant }) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const theme = useMantineTheme()
  const isDark = colorScheme === 'dark'

  useHotkeys([['mod+J', () => toggleColorScheme()]])
  const colorYellow = theme.colors.yellow[4]
  const colorBlue = theme.colors.blue[6]

  if (!switchVariant) {
    return (
      <ActionIcon title={title} variant="outline" color={isDark ? 'yellow' : 'blue'} onClick={() => toggleColorScheme()}>
        {isDark ? <Icon icon="tabler:sun" /> : <Icon icon="tabler:moon-stars" />}
      </ActionIcon>
    )
  }

  return (
    <Switch
      title={title}
      size="md"
      color={isDark ? 'gray' : 'dark'}
      onChange={() => toggleColorScheme()}
      offLabel={<Icon icon="tabler:sun" fontSize={16} stroke="2.5" color={colorYellow} />}
      onLabel={<Icon icon="tabler:moon-stars" fontSize={16} stroke="2.5" color={colorBlue} />}
    />
  )
}
