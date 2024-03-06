import { useAuthContext } from './useAuthContext'
import { useListContext } from './useListContext'

export const useLogout = () => {

    const { dispatch } = useAuthContext()
    const { dispatch: listDispatch } = useListContext()

    const logout = () => {
        // remove user from stoargae
        localStorage.removeItem('user')

        // dispatch logout action
        dispatch({type: 'LOGOUT'})
        listDispatch({type: 'SET_LISTS', payload: []})
    }

    return { logout }
}
