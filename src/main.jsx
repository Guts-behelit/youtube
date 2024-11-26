import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import App from './App.jsx'
import MusicContextProvider from './context/MusicContext.jsx'


createRoot(document.getElementById('root')).render(
 <StrictMode>
  <MusicContextProvider>
  <App />
  </MusicContextProvider>
 </StrictMode>
)
