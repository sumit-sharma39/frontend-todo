import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from "@react-oauth/google";
import './index.css'
import App from './App.jsx'
const client = "786543282178-rlt210nnkolu2r6fiiajtudt2j54je1v.apps.googleusercontent.com"
createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={client}>
  <StrictMode>
    <App />
  </StrictMode>,
  </GoogleOAuthProvider>
)
