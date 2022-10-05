import { Suspense, useEffect, useState } from 'react'
import { Await, defer, LoaderFunction, useLoaderData } from 'react-router-dom'
import { Button, Container, Grid, Skeleton } from '@mantine/core'
import { BarChart } from '../components/Dashboard/BarChart'
import { PieChart } from '../components/Dashboard/PieChart'
import { DataTable } from '../components/Dashboard/DataTable'
import { usePageTitle } from '../hooks/usePageTitle'
import { TopDataLoading, TopDataResolved } from '../components/Dashboard/TopData'
import { client } from '~/lib/api-client'
import { getToken } from '~/lib/auth-provider'
import { useClient } from '~/hooks/useClient'

const mainDomain = import.meta.env.VITE_APP_DOMAIN.replace('dashboard.', '')
const periods = [
  { id: 'day', label: 'Day' },
  { id: '7d', label: 'Week' },
  { id: 'month', label: 'Month' },
]

export const DashboardPage: React.FC = () => {
  const { topData, sourceData, browserData, viewersData } = useLoaderData() as any
  const clientHook = useClient()
  const [period, setPeriod] = useState<'month' | '7d' | 'day'>('day')
  const [timeSeries, setTimeSeries] = useState<any>({ data: [], labels: [] })
  usePageTitle(`Dashboard: Analytics for ${mainDomain}`)

  useEffect(() => {
    clientHook(`analytics/time-series?period=${period}`).then((data) => {
      setTimeSeries(data)
    })
  }, [period, clientHook])

  return (
    <Container sx={{ maxWidth: 'unset', width: '75vw' }} py="lg">
      <Grid gutter={30}>
        <Suspense fallback={<TopDataLoading />}>
          <Await resolve={topData}>{(data) => <TopDataResolved key={data.id} data={data} />}</Await>
        </Suspense>
      </Grid>

      <Grid gutter={30}>
        <Grid.Col span={8}>
          <BarChart
            title="Stats by period"
            actions={
              <Button.Group>
                {periods.map(({ id, label }) => (
                  <Button key={id} variant="default" onClick={() => setPeriod(id as typeof period)} disabled={period === id}>
                    {label}
                  </Button>
                ))}
              </Button.Group>
            }
            data={timeSeries.data}
            type="bar"
            labels={timeSeries.labels}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <Suspense fallback={<Skeleton height={380} />}>
            <Await resolve={sourceData}>{({ sources, data }) => <PieChart title="Traffic Sources" data={data} type="donut" labels={sources} />}</Await>
          </Suspense>
        </Grid.Col>
      </Grid>

      <Grid gutter={30}>
        <Grid.Col span={8}>
          <Suspense fallback={<Skeleton height={380} />}>
            <Await resolve={viewersData}>{(data) => <DataTable domain={mainDomain} data={data} />}</Await>
          </Suspense>
        </Grid.Col>

        <Grid.Col span={4}>
          <Suspense fallback={<Skeleton height={380} />}>
            <Await resolve={browserData}>{({ browsers, data }) => <PieChart title="Browsers" data={data} type="pie" labels={browsers} />}</Await>
          </Suspense>
        </Grid.Col>
      </Grid>
    </Container>
  )
}

export const loader: LoaderFunction = async () => {
  const token = await getToken()

  const data = {
    topData: client('analytics/top-data', { token }),
    sourceData: client('analytics/sources', { token }),
    browserData: client('analytics/browser-stats', { token }),
    viewersData: client('analytics/top-pages', { token }),
  }

  return defer(data)
}
