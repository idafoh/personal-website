import './index.css'
import ReactDOM from 'react-dom/client'
import Plausible from 'plausible-tracker'

import { App } from './App'

export const plausible = Plausible({
  domain: import.meta.env.VITE_APP_RECAPTCHA_SITE_KEY,
})

const captchaScript = document.createElement('script')
captchaScript.setAttribute('defer', '')
captchaScript.setAttribute('src', `https://www.google.com/recaptcha/api.js?render=${import.meta.env.VITE_RECAPTCHA_SITE_KEY}`)

plausible.enableAutoOutboundTracking()
plausible.enableAutoPageviews()

const rootElement = document.getElementById('root') as HTMLElement
rootElement.appendChild(captchaScript)

ReactDOM.createRoot(rootElement).render(<App />)
