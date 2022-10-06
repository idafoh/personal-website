// an auth provider wouldn't use your client, they'd have their own
// so that's why we're not just re-using the client
const authURL = import.meta.env.VITE_AUTH_URL

export interface User {
  id: number
  avatar?: string
  email: string
  role: 'user' | 'admin'
  username: string
  fullName: string
  verified?: boolean
}

export interface LoginData {
  username: string
  password: string
  token: string
}

export interface RegisterData {
  firstName: string
  lastName?: string
  username: string
  email: string
  password: string
  confirmPassword: string
  token: string
}

export interface ApiResponse {
  accessToken: string
  user: User
}

const client = async (endpoint: string, data: any) => {
  const config = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  }

  return fetch(`${authURL}/${endpoint}`, config).then(async (response) => {
    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      return Promise.reject(data)
    }
  })
}

export const localStorageKey = '__auth_provider_token__'

export const getToken = async () => {
  return localStorage.getItem(localStorageKey)
}

const handleUserResponse = (result: ApiResponse) => {
  localStorage.setItem(localStorageKey, result.accessToken)
  return result
}

export const login = async (data: LoginData) => {
  const result = await client('login', { ...data, username: data.username.trim().toLowerCase() })
  return handleUserResponse(result)
}

export const register = async (data: RegisterData) => {
  const result = await client('register', { ...data, username: data.username.trim().toLowerCase() })
  return handleUserResponse(result)
}

export const logout = async () => {
  localStorage.removeItem(localStorageKey)
}

export const getMe = async () => {
  const url = `${import.meta.env.VITE_BACKEND_URL}/users/me`
  const token = await getToken()

  const config = {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  }

  return fetch(url, config).then(async (response) => {
    if (response.status === 401) {
      await logout()
      window.location.assign(window.location.href)
      return Promise.reject({ message: 'Please re-authenticate.' })
    }
    const data = await response.json()
    if (response.ok) {
      return data as User
    } else {
      return Promise.reject(data)
    }
  })
}
