import NavBar from "./components/NavBar"
import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login"
import Signup from "./pages/Signup/Signup"
import { Routes, Route, Navigate } from "react-router-dom"
import { useAuthContext } from "./hooks/useAuthContext"
import './App.css'
import { accent1, primary, secondary } from "./styles/colors"


function App() {

  const {user} = useAuthContext()

  return (
    <div className="app-container">
      <NavBar/>
      <Routes>
        <Route path='/' element={user ? <Home/> : <Navigate to="/login"/>}/>
        <Route path='/login' element={!user ? <Login/> : <Navigate to='/'/>}/>
        <Route path='/signup' element={!user ? <Signup/> : <Navigate to='/'/>}/>
      </Routes>
    </div>
  )
}

export default App
