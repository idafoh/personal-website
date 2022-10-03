import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import * as auth from '../lib/auth-provider'

interface AuthContext {
  user: auth.User | null
  token: string | null
  login: (data: auth.LoginData) => Promise<any>
  register: (data: auth.RegisterData) => Promise<any>
  logout: () => void
}

interface Props {
  children: React.ReactNode
}

const AuthContext = createContext<AuthContext>(null!)
AuthContext.displayName = 'AuthContext'

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<auth.User | null>(null)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    auth.getToken().then((token) => {
      setToken(token)
    })

    auth.getMe().then((user) => setUser(user))
  }, [])

  const login = useCallback(async (data: auth.LoginData) => {
    const { accessToken, user } = await auth.login(data)
    setUser(user)
    setToken(accessToken)

    return user
  }, [])

  const register = useCallback(async (data: auth.RegisterData) => {
    const { accessToken, user } = await auth.register(data)
    setUser(user)
    setToken(accessToken)

    return user
  }, [])

  const logout = useCallback(() => {
    auth.logout()
    setUser(null)
    setToken(null)
  }, [])

  const value = useMemo(() => ({ user, token, login, register, logout }), [user, token, login, register, logout])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
