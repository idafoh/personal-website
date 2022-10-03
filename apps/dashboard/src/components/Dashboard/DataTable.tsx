import { useState } from 'react'
import { Paper, ScrollArea, Table, Text, createStyles } from '@mantine/core'

const data = [
  {
    id: 1,
    url: 'https://rsuitejs.com',
    visits: '105,253',
    unique: '23,361',
    bounce: '11%',
  },
  {
    id: 2,
    url: 'https://rsuitejs.com/components/overview/',
    visits: '103,643',
    unique: '23,385',
    bounce: '17%',
  },
  {
    id: 3,
    url: 'https://rsuitejs.com/components/table/',
    visits: '140,013',
    unique: '41,256',
    bounce: '13%',
  },
  {
    id: 4,
    url: 'https://rsuitejs.com/components/drawer/',
    visits: '194,532',
    unique: '19,038',
    bounce: '18%',
  },
  {
    id: 5,
    url: 'https://rsuitejs.com/guide/usage/',
    visits: '26,353',
    unique: '1,000',
    bounce: '20%',
  },
  {
    id: 6,
    url: 'https://rsuitejs.com/guide/customization/',
    visits: '11,973',
    unique: '4,786',
    bounce: '24%',
  },
  {
    id: 7,
    url: 'https://rsuitejs.com/guide/customization/',
    visits: '11,973',
    unique: '4,786',
    bounce: '24%',
  },
  {
    id: 8,
    url: 'https://rsuitejs.com/guide/customization/',
    visits: '11,973',
    unique: '4,786',
    bounce: '24%',
  },
  {
    id: 9,
    url: 'https://rsuitejs.com/guide/customization/',
    visits: '11,973',
    unique: '4,786',
    bounce: '24%',
  },
]

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

export const DataTable: React.FC = () => {
  const { classes, cx } = useStyles()
  const [scrolled, setScrolled] = useState(false)

  const rows = data.map((element) => (
    <tr key={element.id}>
      <td>
        <a className={classes.url} href={element.url} target="_blank" rel="noreferrer">
          {element.url}
        </a>
      </td>
      <td className={classes.textColor}>{element.visits}</td>
      <td className={classes.textColor}>{element.unique}</td>
      <td className={classes.textColor}>{element.bounce}</td>
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
              <th>VISITORS</th>
              <th>UNIQUE</th>
              <th>BOUNCE RATE</th>
            </tr>
          </thead>

          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    </Paper>
  )
}
