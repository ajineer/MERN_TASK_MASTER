import { useState } from "react"
import { useLogin } from '../hooks/useLogin'
import { TextField, Button, Typography, Paper } from '@mui/material'
import { primary } from "../styles/colors"

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, error, isLoading} = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email, password)
    }

    return (
       
        <Paper elevation={6} sx={{width: '50%', margin: '2rem auto 0 auto', padding: '.5rem'}}>
            <form onSubmit={(e) => {handleSubmit(e)}} style={{display: 'flex', flexDirection: 'column'}}>
                <Typography variant="h4" sx={{display: 'flex', justifyContent:'center'}}>Login</Typography>
                <TextField onChange={(e) => setEmail(e.target.value)} value={email} sx={{margin: '1rem 0 1rem 0'}} type="email" required label="Email"/>
                <TextField onChange={(e) => setPassword(e.target.value)} value={password} type="password" required label="Password"/>
                <Button type='submit' disabled={isLoading} >Login</Button>
                {error && <Typography>{error}</Typography>}
            </form>
        </Paper>
    )
}

export default Login