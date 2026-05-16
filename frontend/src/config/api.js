const rawApiUrl = import.meta.env.VITE_API_URL

export const API_URL = rawApiUrl
  ? rawApiUrl.replace(/\/$/, '')
  : import.meta.env.DEV
    ? 'http://localhost:3000'
    : ''

export function getApiUrl() {
  if (!API_URL) {
    throw new Error('VITE_API_URL is missing. Set it to your deployed backend URL and redeploy the frontend.')
  }

  return API_URL
}
