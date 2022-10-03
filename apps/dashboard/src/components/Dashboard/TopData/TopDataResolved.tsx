import { Grid } from '@mantine/core'
import { useMemo } from 'react'
import * as images from '~/assets/charts'
import { TopCard } from './TopCard'

const formatter = Intl.NumberFormat('en-US', { notation: 'standard' })

interface Props {
  data: any
}

export const TopDataResolved: React.FC<Props> = ({ data }) => {
  const label = useMemo<
    {
      title: string
      image: string
      color: 'red' | 'green' | 'blue'
    }[]
  >(
    () => [
      { title: 'Page Views', image: images.PVIcon, color: 'red' },
      { title: 'Visits', image: images.VVICon, color: 'green' },
      { title: 'Unique Visitors', image: images.UVIcon, color: 'blue' },
    ],
    []
  )

  return (
    <>
      {data.map((v: any, index: number) => (
        <Grid.Col key={v.id} span={4} sx={{ position: 'relative' }}>
          <TopCard key={v.id} bg={label[index].color} image={label[index].image} title={label[index].title} value={formatter.format(v.value)} />
        </Grid.Col>
      ))}
    </>
  )
}
