import { NavLink } from 'react-router-dom'
import { useLogout } from '../../hooks/useLogout'
import { useAuthContext } from '../../hooks/useAuthContext'
import './NavBar.css'

const NavBar = () => {

  const { logout } = useLogout() 
  const { user } = useAuthContext()

  return (
    <nav className='nav-bar'>
        <h2 className='nav-header'>
            Task Master
        </h2>
        {user ? <div className='nav-links'>
            <NavLink to={'/'}>
                Home
            </NavLink>
            <button className='logout-button' onClick={() => logout()}>
                Log out
            </button>
        </div> :
        <div className='nav-links'>
            <NavLink to={'/signup'}>
                Signup
            </NavLink>
            <NavLink to={'/login'}>
                Login
            </NavLink>
        </div>}
    </nav>
  )
}

export default NavBar
