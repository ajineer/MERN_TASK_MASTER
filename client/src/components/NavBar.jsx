import { Link } from "react-router-dom"
import { useLogout } from "../hooks/useLogout"
import { useAuthContext } from "../hooks/useAuthContext"

const NavBar = () => {

    const { logout } = useLogout()
    const { user }  = useAuthContext()

    const handleClick = () => {
      logout() 
    }


    return (
        <nav
          style={{
            margin: '2rem auto 0 auto',
            width: '10rem',
            borderBottom: 'solid black 2px',
            paddingBottom: '.5rem'
          }}
        >
          {user && (<div>
            <button 
              style={{
                display: 'block',
                margin: '0 auto 0 auto'
              }}
              onClick={() => handleClick()}>Log out</button>
          </div>)}
          
          {!user && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%'
            }}
          >
            <Link to='/signup'>Sign up</Link>
            <Link to='/login'>Login</Link>
          </div>)}

          {user && (<div
            style={{
              display: 'flex'
            }}
          >
            <Link to='/'>Home</Link>
          </div>)}
        
        </nav>

    )
}

export default NavBar