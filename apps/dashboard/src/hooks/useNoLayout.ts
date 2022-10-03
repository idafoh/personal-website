import { useEffect } from 'react'

const root = document.getElementById('root')!

export const useNoLayout = () => {
  useEffect(() => {
    root.style.paddingLeft = '0'

    return () => {
      root.style.removeProperty('padding-left')
    }
  }, [])
}
