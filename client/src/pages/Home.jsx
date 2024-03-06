import { useEffect, useState }from 'react'
import { useListsContext } from "../hooks/useListsContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components

// routes
import { fetchListReq } from '../routes/listRoutes'

const Home = () => {
    const {lists, dispatch} = useListsContext() 
    const {user} = useAuthContext()

    useEffect(() => {
        const fetchLists = async () => {
            const response = await fetchListReq(user)
            const json = await response.json()
            if (response.ok){
                dispatch({type: 'SET_LISTS', payload: json})
            }
        }
        if(user){
            fetchLists()
        }
    },[dispatch, user])

    return (
        <div>
            Lists go here
        </div>
    )
}

export default Home