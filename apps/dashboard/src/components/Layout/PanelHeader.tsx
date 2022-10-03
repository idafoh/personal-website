import { ActionIcon, Text, createStyles, Indicator, Group } from '@mantine/core'
import { IconBrandGithub, IconBell, IconBellRinging } from '@tabler/icons'
import { ToggleColorTheme } from './ToggleColorTheme'

interface Props {
  title: string
}

const useStyles = createStyles((theme) => ({
  header: {
    padding: theme.spacing.md,
    paddingBottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '75vw',
    margin: '0 auto',
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
  },
}))

export const PanelHeader: React.FC<Props> = ({ title }) => {
  const { classes, theme } = useStyles()
  const notifications = 2
  const iconColor = theme.colorScheme === 'dark' ? 'grape' : 'dark'

  return (
    <div className={classes.header} aria-expanded={false} tabIndex={-1}>
      <Text weight={600} className={classes.title}>
        {title}
      </Text>

      <Group align="center">
        <ActionIcon component="a" href="https://github.com/dauletbaev" target="_blank" rel="noreferrer noopener" color={iconColor} variant="outline" size="lg" radius="md">
          <IconBrandGithub size={20} />
        </ActionIcon>

        {/* {notifications > 0 ? (
          <Indicator color="red" label={notifications} size={14}>
            <ActionIcon variant="outline" color={iconColor} size="lg" radius="md">
              <IconBellRinging size={20} />
            </ActionIcon>
          </Indicator>
        ) : (
          <ActionIcon variant="outline" color={iconColor} size="lg" radius="md">
            <IconBell size={20} />
          </ActionIcon>
        )} */}

        <ToggleColorTheme />
      </Group>
    </div>
  )
}
