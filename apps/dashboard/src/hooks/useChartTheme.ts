import { ColorScheme } from '@mantine/core'
import { useEffect } from 'react'

export const useChartTheme = (colorScheme: ColorScheme, setOptions: (prevState: any) => void) => {
  useEffect(() => {
    if (colorScheme === 'dark') {
      setOptions((prev: any) => ({
        ...prev,
        theme: {
          mode: 'dark',
          palette: 'palette1',
        },
      }))
    } else {
      setOptions((prev: any) => ({
        ...prev,
        theme: {
          mode: 'light',
          palette: 'palette2',
        },
      }))
    }
  }, [colorScheme])
}
