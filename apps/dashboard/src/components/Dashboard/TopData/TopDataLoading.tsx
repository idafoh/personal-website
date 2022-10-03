import { useMemo } from 'react'
import { Grid } from '@mantine/core'
import { TopCard } from './TopCard'
import * as images from '~/assets/charts'

export const TopDataLoading: React.FC = () => {
  const data = useMemo<
    {
      id: number
      title: string
      image: string
      color: 'red' | 'green' | 'blue'
    }[]
  >(
    () => [
      { id: 1, title: 'Page Views', image: images.PVIcon, color: 'red' },
      { id: 2, title: 'Visits', image: images.VVICon, color: 'green' },
      { id: 3, title: 'Unique Visitors', image: images.UVIcon, color: 'blue' },
    ],
    []
  )

  return (
    <>
      {data.map((data) => (
        <Grid.Col key={data.id} span={4} sx={{ position: 'relative' }}>
          <TopCard key={data.id} bg={data.color} image={data.image} title={data.title} value="loading..." />
        </Grid.Col>
      ))}
    </>
  )
}
