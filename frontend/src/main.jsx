import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import StoreContextProvider from './context/storeContext.jsx'
import {GoogleOAuthProvider} from '@react-oauth/google'

const CLIENT_ID = "656624721099-a6bdb7vmloklos2723b6bn49anq42ber.apps.googleusercontent.com"

createRoot(document.getElementById('root')).render(
   <GoogleOAuthProvider clientId={CLIENT_ID}>
  <BrowserRouter>
      <StoreContextProvider>
         <App />
     </StoreContextProvider>
   </BrowserRouter>
   </GoogleOAuthProvider>
   
 
)
