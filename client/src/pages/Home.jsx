import { useEffect, useState } from 'react'
import { useListContext } from '../hooks/useListContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { Container, List, ListItem, Paper } from '@mui/material'
import NewListForm from '../components/NewListForm'

// components

// routes
import { fetchListReq } from '../routes/listRoutes'
import DeleteBtn from '../components/DeleteBtn'

const Home = () => {
    const {lists, dispatch} = useListContext() 
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
        <Container sx={{display: 'flex'}}>
            <Paper sx={{display: 'flex', flexDirection: 'column'}}>
                <NewListForm />
                <List>
                    {lists.map(list => {
                        return <ListItem key={list._id}>{list.title}<DeleteBtn list={list} user={user}/></ListItem>
                    })}
                </List>
            </Paper>
            <Paper>

            </Paper>
        </Container>
    )
}

export default Home

{/* <EditBtn list={list} user={user}/> */}