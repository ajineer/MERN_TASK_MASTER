// import { Link } from "react-router-dom"
import { useLogout } from "../hooks/useLogout"
import { useAuthContext } from "../hooks/useAuthContext"
import { Button, Container, Grid, Typography, Link } from "@mui/material"
import { primary } from "../styles/colors"

const NavBar = () => {

    const { logout } = useLogout()
    const { user }  = useAuthContext()

    const handleClick = () => {
      logout() 
    }


    return (
        <nav>
          <Container>
              {user?
              <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography align="center" variant="h2" component="h2" sx={{borderTop:"2px solid black", borderBottom:'2px solid black', width:'fit-content', margin: '1rem auto 0 auto'}}>Task Master</Typography>
                </Grid>
                <Grid item xs={6} sx={{display:'flex', justifyContent:'center'}}>
                    <Link component={Button} href='/'>Home</Link>
                </Grid>
                <Grid item xs={6} sx={{display:'flex', justifyContent:'center'}}>
                    <Button onClick={() => handleClick()}>Log out</Button>
                </Grid>
              </Grid>:
              <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography align="center" variant="h2" component="h2" sx={{borderTop:"2px solid black", borderBottom:'2px solid black', width:'fit-content', margin: '1rem auto 0 auto'}}>Task Master</Typography>
                </Grid>
                <Grid item xs={6} sx={{display:'flex', justifyContent:'center'}}>
                    <Link component={Button} href="/signup">Signup</Link>
                </Grid>
                <Grid item xs={6} sx={{display:'flex', justifyContent:'center'}}>
                    <Link component={Button} href= "/login" >Login</Link>
                </Grid>
              </Grid>}
            </Container>
          </nav>
    )
}

export default NavBar