import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppRouter from './Components/AppRouter'
import './css/index.css'


createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AppRouter/>
  </StrictMode>,
)
