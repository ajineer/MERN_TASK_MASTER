import { useState } from "react"
import { useLogin } from '../hooks/useLogin'
import { TextField, Button, Typography } from '@mui/material'
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
        // <form 
        //     onSubmit={(e) => handleSubmit(e)}
        //     style={{
        //         display: 'flex',
        //         flexDirection: 'column',
        //         width:'fit-content',
        //         margin: '10rem auto 0 auto',
        //         border: 'solid 2px black',
        //         padding: '4px'
        //     }}
        // >
        //     <h3>Login</h3>
        //     <label>Email:</label>
        //     <input 
        //         type='email'
        //         onChange={(e) => setEmail(e.target.value)}
        //         value={email}
        //     />
        //     <label>Password:</label>
        //     <input 
        //         type='password'
        //         onChange={(e) => setPassword(e.target.value)}
        //         value={password}
        //     />
        //     <input disabled={isLoading} type='submit' value='sign in'/>
        //     {error && <div>{error}</div>}
        // </form>
        <form style={{display: 'flex', flexDirection: 'column', width: '50%', margin: '1rem auto 0 auto'}}>
            <TextField type="email" required label="Email"/>
            <TextField type="password" required label="Password"/>
            <Button>Login</Button>
            {error && <Typography>{error}</Typography>}
        </form>
    )
}

export default Login