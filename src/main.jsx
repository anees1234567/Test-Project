import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from 'react-query'
import { NotificationProvider } from './notification/context.js'


const queryclient= new QueryClient
createRoot(document.getElementById('root')).render(
  <StrictMode>
   <QueryClientProvider client={queryclient} >
     <NotificationProvider>
      <App />
     </NotificationProvider>
   </QueryClientProvider>
  </StrictMode>,
)
