import { useState } from 'react'
import Chart from 'react-apexcharts'
import { createStyles, Group, Paper, Text } from '@mantine/core'
import { useChartTheme } from '~/hooks/useChartTheme'

interface PieChartProps {
  title: string
  data: any
  type?: 'line' | 'area' | 'bar' | 'histogram' | 'pie' | 'donut' | 'radialBar' | 'scatter' | 'bubble' | 'heatmap' | 'treemap' | 'boxPlot' | 'candlestick' | 'radar' | 'polarArea' | 'rangeBar'
  options?: any
  labels?: string[]
}

const defaultOptions = {
  dataLabels: {
    enabled: false,
  },
  plotOptions: {
    pie: {
      customScale: 0.8,
      donut: {
        size: '75%',
      },
      offsetY: 0,
    },
    stroke: {
      colors: undefined,
    },
  },
  colors: ['#5f71e4', '#2dce88', '#fa6340', '#f5365d', '#13cdef'],
  legend: {
    position: 'bottom',
    offsetY: 0,
  },
}

const useStyles = createStyles(() => ({}))

export const PieChart: React.FC<PieChartProps> = ({ title, data, type, labels, options }) => {
  const { theme } = useStyles()
  const [_options, setOptions] = useState(defaultOptions)

  useChartTheme(theme.colorScheme, setOptions)

  return (
    <Paper shadow="sm" p="lg">
      <Group mb={20}>
        <Text weight={500}>{title}</Text>
      </Group>
      <Chart series={data} type={type} height={340} options={Object.assign({}, _options, options, { labels })} />
    </Paper>
  )
}
