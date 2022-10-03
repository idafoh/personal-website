import { Suspense } from 'react'
import { Await, defer, LoaderFunction, useLoaderData } from 'react-router-dom'
import { Button, Container, Grid, Skeleton } from '@mantine/core'
import { BarChart } from '../components/Dashboard/BarChart'
import { PieChart } from '../components/Dashboard/PieChart'
import { DataTable } from '../components/Dashboard/DataTable'
import { usePageTitle } from '../hooks/usePageTitle'
import { TopDataLoading, TopDataResolved } from '../components/Dashboard/TopData'

export const DashboardPage: React.FC = () => {
  const { topData, trafficData, sourceData, browserData } = useLoaderData() as any
  usePageTitle('Dashboard')

  return (
    <Container sx={{ maxWidth: 'unset', width: '75vw' }} py="lg">
      <Grid gutter={30}>
        <Suspense fallback={<TopDataLoading />}>
          <Await resolve={topData}>
            {(data) => <TopDataResolved key={data.id} data={data} />}
          </Await>
        </Suspense>
      </Grid>

      <Grid gutter={30}>
        <Grid.Col span={8}>
          <Suspense fallback={<Skeleton height={380} />}>
            <Await resolve={trafficData}>
              {(data) => (
                <BarChart
                  title="Traffic Summary"
                  actions={
                    <Button.Group>
                      <Button variant="default">Day</Button>
                      <Button variant="default">Week</Button>
                      <Button variant="default">Month</Button>
                    </Button.Group>
                  }
                  data={data}
                  type="bar"
                  labels={[
                    '2022-01-20',
                    '2022-01-21',
                    '2022-01-22',
                    '2022-01-23',
                    '2022-01-24',
                    '2022-01-25',
                    '2022-01-26',
                    '2022-01-27',
                    '2022-01-28',
                    '2022-01-29',
                    '2022-01-30',
                    '2022-02-01',
                    '2022-02-02',
                    '2022-02-03',
                    '2022-02-04',
                    '2022-02-05',
                    '2022-02-06',
                    '2022-02-07',
                    '2022-02-08',
                    '2022-02-09',
                    '2022-02-10',
                    '2022-02-11',
                    '2022-02-12',
                    '2022-02-13',
                    '2022-02-14',
                    '2022-02-15',
                    '2022-02-16',
                    '2022-02-17',
                    '2022-02-18',
                    '2022-02-19',
                    '2022-02-20',
                    '2022-02-21',
                    '2022-02-22',
                    '2022-02-23',
                    '2022-02-24',
                    '2022-02-25',
                    '2022-02-26',
                  ]}
                />
              )}
            </Await>
          </Suspense>
        </Grid.Col>
        <Grid.Col span={4}>
          <Suspense fallback={<Skeleton height={380} />}>
            <Await resolve={sourceData}>
              {(data) => <PieChart title="Traffic Sources" data={data} type="donut" labels={['Direct', 'Internal', 'Referrals', 'Search Engines', 'Other']} />}
            </Await>
          </Suspense>
        </Grid.Col>
      </Grid>

      <Grid gutter={30}>
        <Grid.Col span={8}>
          <DataTable />
        </Grid.Col>

        <Grid.Col span={4}>
          <Suspense fallback={<Skeleton height={380} />}>
            <Await resolve={browserData}>
              {(data) => <PieChart title="Browsers" data={data} type="pie" labels={['Chrome', 'Edge', 'Firefox', 'Safari', 'Other']} />}
            </Await>
          </Suspense>
        </Grid.Col>
      </Grid>
    </Container>
  )
}

export const loader: LoaderFunction = () => {
  const topData = [
    { id: 'views', value: 281_358 },
    { id: 'visits', value: 251_901 },
    { id: 'unique_visitors', value: 25_135 },
  ]

  const trafficData = [
    {
      name: 'Web',
      data: [11, 8, 9, 10, 3, 11, 11, 11, 12, 13, 2, 12, 5, 8, 22, 6, 8, 6, 4, 1, 8, 24, 29, 51, 40, 47, 23, 26, 50, 26, 22, 27, 46, 47, 81, 46, 40],
    },
    {
      name: 'Social',
      data: [7, 5, 4, 3, 3, 11, 4, 7, 5, 12, 12, 15, 13, 12, 6, 7, 7, 1, 5, 5, 2, 12, 4, 6, 18, 3, 5, 2, 13, 15, 20, 47, 18, 15, 11, 10, 9],
    },
    {
      name: 'Other',
      data: [4, 9, 11, 7, 8, 3, 6, 5, 5, 4, 6, 4, 11, 10, 3, 6, 7, 5, 2, 8, 4, 9, 9, 2, 6, 7, 5, 1, 8, 3, 12, 3, 4, 9, 7, 11, 10],
    },
  ]

  const sourceData = [112332, 123221, 432334, 342334, 133432]
  const browserData = [10000, 3000, 2000, 1000, 900]

  const getDataAfterDelay = (data: any, ms: number) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data)
      }, ms)
    })
  }

  const data = {
    topData: getDataAfterDelay(topData, 200),
    trafficData: getDataAfterDelay(trafficData, 500),
    sourceData: getDataAfterDelay(sourceData, 200),
    browserData: getDataAfterDelay(browserData, 500),
  }

  return defer(data)
}
