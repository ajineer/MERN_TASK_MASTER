import { useState } from "react"
import { useSignup } from "../hooks/useSignup"

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {signup, isLoading, error } = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup(email, password)
    }

    return (
        <form 
            onSubmit={(e) => handleSubmit(e)}
            style={{
                display: 'flex',
                flexDirection: 'column',
                width:'fit-content',
                margin: '10rem auto 0 auto',
                border: 'solid 2px black',
                padding: '4px'
            }}
        >
            <h3>Sign up</h3>
            <label>Email:</label>
            <input 
                type='email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <label>Password:</label>
            <input 
                type='password'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <input disabled={isLoading} type='submit' value='submit'/>
            {error && <div>{error}</div>}
        </form>
    )
}

export default Signup