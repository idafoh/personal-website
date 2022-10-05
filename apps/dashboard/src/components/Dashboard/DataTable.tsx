import { useState } from 'react'
import { Paper, ScrollArea, Table, Text, createStyles } from '@mantine/core'

const useStyles = createStyles((theme) => ({
  paper: {
    // backgroundColor: theme.colorScheme === 'dark' ? '#ddd' : '#fff',
    // color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : '#575757',
  },

  header: {
    position: 'sticky',
    top: 0,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    transition: 'box-shadow 150ms ease',

    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[2]}`,
    },
  },

  url: {
    color: '#1675e0',
    textDecoration: 'none',

    ['&:hover, &:focus']: {
      color: '#0a5dc2',
      textDecoration: 'underline',
    },
  },

  textColor: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : '#575757',
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}))

interface Props {
  data: any[]
  domain: string
}

export const DataTable: React.FC<Props> = ({ domain, data }) => {
  const { classes, cx } = useStyles()
  const [scrolled, setScrolled] = useState(false)

  const rows = data.map((element, index) => (
    <tr key={index}>
      <td>
        <a className={classes.url} href={`https://${domain}${element.page}`} target="_blank" rel="noreferrer">
          {`https://${domain}${element.page}`}
        </a>
      </td>
      <td className={classes.textColor}>{element.visitors?.toLocaleString('en-US')}</td>
      <td className={classes.textColor}>{element.pageviews?.toLocaleString('en-US')}</td>
      <td className={classes.textColor}>{element.bounce_rate || 0}%</td>
    </tr>
  ))

  return (
    <Paper shadow="sm" p="lg" className={classes.paper}>
      <Text weight={500} mb={20}>
        Most Visited Pages
      </Text>
      <ScrollArea sx={{ height: 300 }} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
        <Table>
          <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
            <tr>
              <th>PAGE NAME</th>
              <th>UNIQUE</th>
              <th>VISITORS</th>
              <th>BOUNCE RATE</th>
            </tr>
          </thead>

          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    </Paper>
  )
}
