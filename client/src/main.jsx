import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import { AuthContextProvider } from './context/AuthContext'
import App from './App'
import { TaskContextProvider } from './context/TaskContext'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
        <TaskContextProvider>
          <Router>
            <App />
          </Router>
        </TaskContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
