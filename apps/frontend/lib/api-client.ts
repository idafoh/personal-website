import * as auth from '../lib/auth-provider'
const apiURL = process.env.NEXT_PUBLIC_API_URL

export interface Config {
  data?: object
  token?: string | null
  headers?: { [key: string]: any }
  [key: string]: any
}

export const client = async (endpoint: string, { data, token, headers: customHeaders = {}, ...customConfig }: Config = {}) => {
  if (token) {
    customHeaders['Authorization'] = `Bearer ${token}`
  }
  if (data) {
    customHeaders['Content-Type'] = 'application/json'
  }

  const config = {
    method: data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : undefined,
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
