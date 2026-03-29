import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppRouter from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <AuthProvider>

    <AppRouter />
  </AuthProvider>
  ,
)
