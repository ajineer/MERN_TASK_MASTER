import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import { AuthContextProvider } from './context/AuthContext'
import App from './App'
import { ListContextProvider } from './context/ListContext'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ListContextProvider>
        <Router>
          <App />
        </Router>
      </ListContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
