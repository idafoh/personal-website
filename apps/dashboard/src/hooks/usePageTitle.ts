import { useEffect } from 'react'
import { useGlobal } from '../context/global'

export const usePageTitle = (title: string) => {
  const { setTitle } = useGlobal()

  useEffect(() => {
    setTitle(title)
    document.title = title

    return () => {
      document.title = 'React App'
    }
  }, [title])
}
