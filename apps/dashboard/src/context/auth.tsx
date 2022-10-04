import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import * as auth from '../lib/auth-provider'

interface AuthContextType {
  user: auth.User | null
  role: 'user' | 'admin'
  verified: boolean
  token: string | null
  login: (data: auth.LoginData) => Promise<any>
  register: (data: auth.RegisterData) => Promise<any>
  logout: (callback?: VoidFunction) => void
}

interface Props {
  children: React.ReactNode
}

const AuthContext = createContext<AuthContextType>(null!)
AuthContext.displayName = 'AuthContext'

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<auth.User | null>(null)
  const [role, setRole] = useState<AuthContextType['role']>('user')
  const [token, setToken] = useState<string | null>(null)
  const [verified, setVerified] = useState(false)

  useEffect(() => {
    auth.getToken().then((token) => {
      if (token) {
        setToken(token)
        auth.getMe().then((user) => {
          setUser(user)
          setRole(user.role)
          setVerified(user.verified ?? false)
        })
      }
    })
  }, [])

  const login = useCallback(async (data: auth.LoginData) => {
    const { accessToken, user } = await auth.login(data)
    setUser(user)
    setRole(user.role)
    setToken(accessToken)
    setVerified(user.verified ?? false)

    return user
  }, [])

  const register = useCallback(async (data: auth.RegisterData) => {
    const { accessToken, user } = await auth.register(data)
    setUser(user)
    setRole(user.role)
    setToken(accessToken)
    setVerified(user.verified ?? false)

    return user
  }, [])

  const logout = useCallback((callback?: VoidFunction) => {
    auth.logout()
    setUser(null)
    setToken(null)
    callback?.()
  }, [])

  const value = useMemo(() => ({ user, token, verified, role, login, register, logout }), [user, token, verified, role, login, register, logout])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
