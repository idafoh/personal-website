import { useCallback } from 'react'
import { useAuth } from '../context/auth'
import { client, Config } from '../lib/api-client'

export const useClient = () => {
  const { token } = useAuth()

  return useCallback((endpoint: string, config?: Config) => client(endpoint, { ...config, token }), [token])
}
