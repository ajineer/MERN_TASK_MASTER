import { useState } from "react"
import { useSignup } from "../../hooks/useSignup"
import '../Login/Login.css'

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
                className="login-form"
            >
                <h2 className="login-header">Signup</h2>
                <div className="form-group">
                    <input
                        className="form-input"
                        required
                        placeholder=""
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        type="email"
                    />
                    <label className="form-label" htmlFor='floatingInput'>Email</label>
                </div>
                <div className="form-group">
                    <input
                        className="form-input"
                        required
                        placeholder=""
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        type="password"
                    />
                    <label className="form-label" htmlFor="floatingInput">Password</label>
                </div>
                <input className="login-button" type='submit' value='Login' disabled={isLoading}/>
                {error && <h3>{error}</h3>}
            </form>
    )
}

export default Signup