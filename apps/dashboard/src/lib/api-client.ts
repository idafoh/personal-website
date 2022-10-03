import * as auth from '../lib/auth-provider'
const apiURL = import.meta.env.VITE_BACKEND_URL

export interface Config {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  data?: object
  token?: string | null
  headers?: { [key: string]: any }
  [key: string]: any
}

export const client = async (endpoint: string, { method, data, token, headers: customHeaders = {}, ...customConfig }: Config = {}) => {
  if (token) {
    customHeaders['Authorization'] = `Bearer ${token}`
  }

  const isFormData = data instanceof FormData

  if (data && !isFormData) {
    customHeaders['Content-Type'] = 'application/json'
  }

  const config = {
    method: method ? method : data ? 'POST' : 'GET',
    body: data ? (isFormData ? data : JSON.stringify(data)) : undefined,
    headers: customHeaders,
    ...customConfig,
  }

  return fetch(`${apiURL}/${endpoint}`, config).then(async (response) => {
    if (response.status === 401) {
      await auth.logout()
      // refresh the page
      window.location.assign(window.location.href)
      return Promise.reject({ message: 'Please re-authenticate.' })
    }
    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      return Promise.reject(data)
    }
  })
}
