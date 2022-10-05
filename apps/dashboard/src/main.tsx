import './index.css'
import ReactDOM from 'react-dom/client'
import Plausible from 'plausible-tracker'

import { App } from './App'

export const plausible = Plausible({
  domain: import.meta.env.VITE_APP_DOMAIN,
})

plausible.enableAutoOutboundTracking()
plausible.enableAutoPageviews()

const rootElement = document.getElementById('root') as HTMLElement

ReactDOM.createRoot(rootElement).render(<App />)
