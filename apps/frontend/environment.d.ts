declare namespace NodeJS {
  interface ProcessEnv {
    REVALIDATE_SECRET: string
    YEAR_OF_BIRTH: string
    MY_DOMAIN: string
    MY_EMAIL: string
    NEXT_PUBLIC_CV_LINK: string
    NEXT_PUBLIC_API_URL: string
    NEXT_PUBLIC_DASHBOARD_URL: string
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: string
    SPOTIFY_CLIENT_ID: string
    SPOTIFY_CLIENT_SECRET: string
    SPOTIFY_REFRESH_TOKEN: string
    MONGODB_URI: string
    MONGODB_DB: string
  }
}
