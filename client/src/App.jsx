import NavBar from "./components/NavBar"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import { Routes, Route, Navigate } from "react-router-dom"
import { useAuthContext } from "./hooks/useAuthContext"
import { Container } from "@mui/material"


function App() {

  const {user} = useAuthContext()

  return (
    <div>
      <Container maxWidth='lg' sx={{border: 'black solid 2px'}}>
        <NavBar/>
        <Routes>
          <Route path='/' element={user ? <Home/> : <Navigate to="/login"/>}/>
          <Route path='/login' element={!user ? <Login/> : <Navigate to='/'/>}/>
          <Route path='/signup' element={!user ? <Signup/> : <Navigate to='/'/>}/>
        </Routes>
      </Container>
    </div>
  )
}

export default App
