import NavBar from "./components/NavBar"
import Home from "./pages/Home/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import { Routes, Route, Navigate } from "react-router-dom"
import { useAuthContext } from "./hooks/useAuthContext"
import { Box, Container } from "@mui/material"
import { accent1, primary, secondary } from "./styles/colors"


function App() {

  const {user} = useAuthContext()

  return (
    <Container maxWidth={false} sx={{margin: '0', padding: '0', display: 'flex', flexDirection: 'column', border: 'black solid 2px', background: 'linear-gradient(#7495A8, #E3F5FF)', minHeight: '100vh' }}>
        <NavBar/>
        <Routes>
          <Route path='/' element={user ? <Home/> : <Navigate to="/login"/>}/>
          <Route path='/login' element={!user ? <Login/> : <Navigate to='/'/>}/>
          <Route path='/signup' element={!user ? <Signup/> : <Navigate to='/'/>}/>
        </Routes>
    </Container>
  )
}

export default App
