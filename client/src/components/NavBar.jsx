import { Link } from "react-router-dom"
import { useLogout } from "../hooks/useLogout"
import { useAuthContext } from "../hooks/useAuthContext"
import { Button, Container, Grid, Typography } from "@mui/material"
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
                    <Typography variant="h2" component="h2">Task Master</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Link to='/'>Home</Link>
                </Grid>
                <Grid item xs={6}>
                    <Button onClick={() => handleClick()}>Log out</Button>
                </Grid>
              </Grid>:
              <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography align="center" variant="h2" component="h2">Task Master</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Link to='/signup'>Signup</Link>
                </Grid>
                <Grid item xs={6}>
                    <Link to='/login'>Login</Link>
                </Grid>
              </Grid>}
            </Container>
          </nav>
    )
}

export default NavBar