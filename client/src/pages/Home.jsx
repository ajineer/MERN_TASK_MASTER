import { useEffect, useState } from 'react'
import { useListContext } from '../hooks/useListContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { Box, Button, Container, List, ListItem, Paper, TextField, Typography } from '@mui/material'
import NewListForm from '../components/NewListForm'

// components

// routes
import { fetchListReq, patchListReq } from '../routes/listRoutes'
import DeleteBtn from '../components/DeleteBtn'
import Task from '../components/Task'
import NewTaskForm from '../components/NewTaskForm'

const Home = () => {
    const {lists, dispatch} = useListContext() 
    const {user} = useAuthContext()
    const [edit, setEdit] = useState(false)
    const [selList, setSelList] = useState(lists[0])
    const [editListForm, setEditListForm] = useState({
        title: ''
    })

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
    },[dispatch, user, setSelList])

    const handleClick = async (list, e) => {
        e.preventDefault()
        const response = await patchListReq(list, user, editListForm)
        const json = await response.json()
        if(response.ok){
            dispatch({type:'UPDATE_LIST', payload: json})
            setEdit(false)
        }else{
            console.log(json.error)
        }
    }

    return (
        <Container sx={{display: 'flex'}}>
            <Paper sx={{display: 'flex', flexDirection: 'column'}}>
                <Typography variant='h4' sx={{margin: '0 auto 0 auto'}}>Lists</Typography>
                <NewListForm />
                <List>
                    {lists.map(list => {
                        return <ListItem key={list._id}>
                                {!edit? 
                                <Box>
                                    <Typography sx={{"&:hover": {backgroundColor: 'grey', cursor: 'pointer'}}} onClick={() => setSelList(list)}>
                                        {list.title}
                                    </Typography>
                                    <Button onClick={() => setEdit(true)}>/</Button><DeleteBtn list={list} user={user}/>
                                </Box>
                                : 
                                <form onSubmit={(e) => handleClick(list, e)}>
                                    <TextField onChange={(e) => setEditListForm({title: e.target.value})} placeholder={list.title}/>
                                </form>
                                }
                            </ListItem>
                    })}
                </List>
            </Paper>
            <Paper>
                <Typography variant='h4'>
                    {selList?.title}
                </Typography>
                {selList && <NewTaskForm setSelList={setSelList} selList={selList}/>}
                <List>
                    {selList?.tasks?.map(task => {
                        return <Task key={task._id} setSelList={setSelList} selList={selList} task={task}/>
                    })}
                </List>
            </Paper>
        </Container>
    )
}

export default Home

{/* <EditBtn list={list} user={user}/> */}