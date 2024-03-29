import { useEffect, useState } from 'react'
import { useListContext } from '../hooks/useListContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { Box, Button, Container, Grid, List, ListItem, Paper, TextField, Typography } from '@mui/material'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'
import NewListForm from '../components/NewListForm'

// components

// routes
import { fetchListReq, patchListReq } from '../routes/listRoutes'
import DeleteBtn from '../components/DeleteBtn'
import Task from '../components/Task'
import NewTaskForm from '../components/NewTaskForm'
import { primary, secondary } from '../styles/colors';

const Home = () => {
    const {lists, dispatch} = useListContext() 
    const {user} = useAuthContext()
    const [index, setIndex] = useState(0)
    const [edit, setEdit] = useState(false)
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
    },[dispatch, user])

    useEffect(() => {
        setIndex(current => current)
    },[lists[index]])

    const handleClick = async (list, e) => {
        e.preventDefault()
        const response = await patchListReq(list, user, editListForm)
        const json = await response.json()
        if(response.ok){
            dispatch({type:'UPDATE_LIST', payload: json})
            const res = await fetchListReq(user)
            const listJson = await res.json()
            if(res.ok){
                dispatch({type: "SET_LISTS", payload: listJson})
            }
            setEdit(false)
        }else{
            console.log(json.error)
        }
    }

    const leftClick = () => {
        setEdit(false)
        setIndex(current => current === 0 ? lists.length-1 : current - 1)
    }
    const rightClick = () => {
        setEdit(false)
        setIndex(current => current === lists.length-1 ? 0 : current + 1)
    }

    return (
        <Container sx={{display: 'flex', flexDirection: 'column', height: '85%'}}>
            <Paper sx={{display: 'flex', flexDirection: {md: 'row', sm: 'column-reverse', xs: 'column-reverse'}, justifyContent:'space-evenly' , height: 'fit-content', width: {md: '75%', sm: '100%', xs: '100%'}, margin:'1rem auto 0 auto'}}>
                <Paper sx={{width: {sm: '100%', lg: '50%'}}}>
                    <List sx={{display:"flex", justifyContent: 'space-evenly'}}>
                        <ArrowLeftIcon onClick={() => leftClick()} sx={{'&:hover': {color: secondary}, margin: 'auto 0 auto 0'}} fontSize='large'/>
                            {!edit ? 
                                <ListItem onClick={() => setEdit(true)} sx={{display:'flex', justifyContent:'center'}}>{lists[index]?.title}</ListItem>
                                :
                                <form style={{margin: 'auto 0 auto 0'}} onSubmit={(e) => handleClick(lists[index], e)}>
                                    <input style={{width: '4rem'}} onKeyDown={(e) => {if(e.key === 'Escape'){setEdit(false)}}} onChange={(e) => setEditListForm({title: e.target.value})} maxLength={16} required placeholder={lists[index]?.title}/>
                                    <DeleteBtn setEdit={setEdit} list={lists[index]} user={user}/>
                                </form>
                            }
                        <ArrowRightIcon onClick={() => rightClick()} sx={{'&:hover': {color: secondary}, margin: 'auto 0 auto 0'}} fontSize='large'/>
                    </List>
                </Paper>
                <NewListForm setIndex={setIndex}/>
            </Paper>
            <Paper sx={{height: {md: '70%', sm: '40%', xs: '40%'}, width: {md: '75%', sm: '100%', xs: '100%'}, margin: '1rem auto 0 auto', paddingBottom: '2rem', overflow: 'hidden'}}>
                <NewTaskForm index={index}/>
                <List sx={{overflow: 'scroll', height: '85%'}}>
                    {lists[index]?.tasks.map(task => 
                            <Task key={task._id} index={index} task={task}/>
                        )}
                </List>
            </Paper>
        </Container>
    )
}

export default Home