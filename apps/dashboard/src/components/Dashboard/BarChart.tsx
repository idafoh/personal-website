import Chart from 'react-apexcharts'
import { Group, Paper, Text, createStyles } from '@mantine/core'
import { useColorScheme } from '@mantine/hooks'
import { useEffect, useState } from 'react'
import { useChartTheme } from '~/hooks/useChartTheme'

interface BarChartProps {
  title?: React.ReactNode
  actions?: React.ReactNode
  data: any
  type?: 'line' | 'area' | 'bar' | 'histogram' | 'pie' | 'donut' | 'radialBar' | 'scatter' | 'bubble' | 'heatmap' | 'treemap' | 'boxPlot' | 'candlestick' | 'radar' | 'polarArea' | 'rangeBar'
  options?: any
  labels?: string[]
}

const defaultOptions = {
  chart: {
    fontFamily: 'inherit',
    parentHeightOffset: 0,
    toolbar: {
      show: false,
    },
    animations: {
      enabled: false,
    },
    stacked: true,
  },
  plotOptions: {
    bar: {
      columnWidth: '50%',
    },
  },
  dataLabels: {
    enabled: false,
  },
  fill: {
    opacity: 1,
  },
  grid: {
    padding: {
      top: -20,
      right: 0,
      left: -4,
      bottom: -4,
    },
    strokeDashArray: 4,
    xaxis: {
      lines: {
        show: true,
      },
    },
  },
  xaxis: {
    tooltip: {
      enabled: false,
    },
    axisBorder: {
      show: false,
    },
    type: 'datetime',
  },
  yaxis: {
    labels: {
      padding: 4,
    },
  },
  colors: ['#206bc4', '#79a6dc', '#bfe399'],
  legend: {
    show: false,
  },
  theme: {
    mode: 'light',
    palette: 'palette2',
  },
}

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: 16,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
  },
  actions: {
    marginLeft: 'auto',
  },
}))

export const BarChart: React.FC<BarChartProps> = ({ title, actions, data, type, labels, options }) => {
  const { classes, theme } = useStyles()
  const [_options, setOptions] = useState(defaultOptions)

  useChartTheme(theme.colorScheme, setOptions)

  return (
    <Paper shadow="sm" p="lg">
      <Group mb={20}>
        <Text weight={500} className={classes.title}>
          {title}
        </Text>
        {actions && <div className={classes.actions}>{actions}</div>}
      </Group>
      <Chart series={data} type={type} height={284} options={Object.assign({}, _options, options, { labels })} />
    </Paper>
  )
}
