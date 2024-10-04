import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { CustomerContextProvider } from './context/CustomersContextProvicer.tsx'
import { ThemeProvider } from './components/theme-provider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <CustomerContextProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <App />
      </ThemeProvider>
      </CustomerContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
