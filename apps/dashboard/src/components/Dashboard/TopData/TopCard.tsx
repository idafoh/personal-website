import { Paper, Text, createStyles } from '@mantine/core'

interface TopCardProps {
  bg: 'red' | 'green' | 'blue'
  title: string
  value: number | string
  image: string
}

const useStyles = createStyles((theme) => ({
  box: {
    padding: theme.spacing.md,
    borderRadius: theme.radius.sm,
    color: theme.white,
  },

  image: {
    width: 100,
    position: 'absolute',
    left: 26,
    top: 50,
    opacity: 0.5,
  },

  red: {
    background: 'linear-gradient(87deg, #f5365c 0, #f56036 100%)',
  },
  green: {
    background: 'linear-gradient(87deg, #2dce89 0, #2dcecc 100%)',
  },
  blue: {
    background: 'linear-gradient(87deg, #11cdef 0, #1171ef 100%)',
  },
}))

export const TopCard: React.FC<TopCardProps> = ({ bg, title, value, image }) => {
  const { classes, cx } = useStyles()

  return (
    <Paper className={cx(classes.box, classes[bg])}>
      <img className={classes.image} src={image} />
      <Text align="right">{title}</Text>
      <Text align="right" size={36}>
        {value}
      </Text>
    </Paper>
  )
}
