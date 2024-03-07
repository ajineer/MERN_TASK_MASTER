import NavBar from "./components/NavBar"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import { Routes, Route, Navigate } from "react-router-dom"
import { useAuthContext } from "./hooks/useAuthContext"
import { Box, Container } from "@mui/material"
import { accent1, secondary } from "./styles/colors"


function App() {

  const {user} = useAuthContext()

  return (
    <Box component='div' sx={{ display: 'block', height: '97vh', background: 'linear-gradient(#7495A8, #E3F5FF)'}}>
      <Container maxWidth='lg' sx={{border: 'black solid 2px'}}>
        <NavBar/>
        <Routes>
          <Route path='/' element={user ? <Home/> : <Navigate to="/login"/>}/>
          <Route path='/login' element={!user ? <Login/> : <Navigate to='/'/>}/>
          <Route path='/signup' element={!user ? <Signup/> : <Navigate to='/'/>}/>
        </Routes>
      </Container>
    </Box>
  )
}

export default App
