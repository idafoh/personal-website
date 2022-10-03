import { createContext, useContext, useState } from 'react'

interface GlobalContextType {
  title: string
  setTitle: (title: string) => void
}

interface Props {
  children: React.ReactNode
}

const GlobalContext = createContext<GlobalContextType>(null!)

export const useGlobal = () => {
  return useContext(GlobalContext)
}

export const GlobalProvider: React.FC<Props> = ({ children }) => {
  const [title, setTitle] = useState<string>('')

  return <GlobalContext.Provider value={{ title, setTitle }}>{children}</GlobalContext.Provider>
}
