import { useState } from "react"
import { useSignup } from "../hooks/useSignup"
import { Button, Paper, TextField, Typography } from "@mui/material"

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {signup, isLoading, error } = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup(email, password)
    }

    return (
        
        <Paper elevation={6} sx={{width: '50%', margin: '2rem auto 0 auto', padding: '.5rem'}}>
            <form onSubmit={(e) => {handleSubmit(e)}} style={{display: 'flex', flexDirection: 'column'}}>
                <Typography variant="h4" sx={{display: 'flex', justifyContent:'center'}}>Signup</Typography>
                <TextField onChange={(e) => setEmail(e.target.value)} value={email} sx={{margin: '1rem 0 1rem 0'}} type="email" required label="Email"/>
                <TextField onChange={(e) => setPassword(e.target.value)} value={password} type="password" required label="Password"/>
                <Button type='submit' disabled={isLoading} >Signup</Button>
                {error && <Typography>{error}</Typography>}
            </form>
        </Paper>
    )
}

export default Signup