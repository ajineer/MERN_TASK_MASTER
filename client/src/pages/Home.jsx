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
    },[dispatch, user, lists[index]])

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

    const leftClick = () => {
        setEdit(false)
        setIndex(current => current === 0 ? lists.length-1 : current - 1)
    }
    const rightClick = () => {
        setEdit(false)
        setIndex(current => current === lists.length-1 ? 0 : current + 1)
    }

    return (
        <Container sx={{display: 'flex', flexDirection: 'column', height: 'inherit'}}>
            <Paper sx={{display: 'flex', flexDirection: {md: 'row', sm: 'column-reverse', xs: 'column-reverse'}, justifyContent:'space-evenly' , height: 'fit-content', width: {md: '75%', sm: '100%', xs: '100%'}, margin:'1rem auto 0 auto'}}>
                <Paper sx={{width: {sm: '100%', lg: '50%'}}}>
                    <List sx={{display:"flex", justifyContent: 'space-evenly'}}>
                        <ArrowLeftIcon onClick={() => leftClick()} sx={{'&:hover': {color: secondary}, margin: 'auto 0 auto 0'}} fontSize='large'/>
                            {!edit ? 
                                <ListItem onClick={() => setEdit(true)} sx={{display:'flex', justifyContent:'center'}}>{lists[index]?.title}</ListItem>
                                :
                                <form style={{margin: 'auto 0 auto 0'}} onSubmit={(e) => handleClick(lists[index], e)}>
                                    <input style={{width: '5rem'}} onKeyDown={(e) => {if(e.key === 'Escape'){setEdit(false)}}} onChange={(e) => setEditListForm({title: e.target.value})} placeholder={lists[index]?.title}/>
                                    <DeleteBtn setEdit={setEdit} list={lists[index]} user={user}/>
                                </form>
                            }
                        <ArrowRightIcon onClick={() => rightClick()} sx={{'&:hover': {color: secondary}, margin: 'auto 0 auto 0'}} fontSize='large'/>
                    </List>
                </Paper>
                <NewListForm setIndex={setIndex}/>
            </Paper>
            <Paper sx={{height: '11rem', width: {md: '75%', sm: '100%', xs: '100%'}, margin: '1rem auto 0 auto'}}>
                {/* {!edit? 
                    <Box sx={{display: 'flex', width: 'fit-content', margin: '1rem auto 0 auto', alignItems: 'center'}}>
                        <Typography>
                            {lists[index]?.title}
                        </Typography>
                        <Button onClick={() => setEdit(true)}>/</Button>
                        <DeleteBtn list={lists[index]} user={user}/>
                    </Box>
                    : 
                    <Box sx={{display: 'flex', width: 'fit-content', margin: '1rem auto 0 auto'}}>
                        <form onSubmit={(e) => handleClick(lists[index], e)}>
                            <TextField onKeyDown={(e) => {if(e.key === 'Escape'){setEdit(false)}}} onChange={(e) => setEditListForm({title: e.target.value})} placeholder={lists[index].title}/>
                        </form>
                    </Box>
                    } */}
                    <Paper elevation={2} sx={{height: 'inherit', overflow: 'scroll'}}>
                        <NewTaskForm index={index}/>
                        <List sx={{overflow: 'scroll'}}>
                            {lists[index]?.tasks.map(task => 
                                    <Task key={task._id} index={index} task={task}/>
                                )}
                        </List>
                    </Paper>
            </Paper>
            {/* <Paper sx={{display: 'flex', flexDirection: 'column', height: '100%', padding: '0.5rem 0.5rem 0 0.5rem'}}>
                <Typography variant='h4' sx={{margin: '0 auto 0 auto'}}>Lists</Typography>
                <NewListForm />
                <List sx={{height: '100%', overflow:'scroll'}}>
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
                                    <TextField onKeyDown={(e) => {if(e.key === 'Escape'){setEdit(false)}}} onChange={(e) => setEditListForm({title: e.target.value})} placeholder={list.title}/>
                                </form>
                                }
                            </ListItem>
                    })}
                </List>
            </Paper>
            <Paper sx={{height: '100%', padding: '0.5rem 0.5rem 0 0.5rem'}}>
                <Typography variant='h4' sx={{margin: '0 auto 0 auto', width:'fit-content'}}>
                    {selList?.title}
                </Typography>
                {selList && <NewTaskForm setSelList={setSelList} selList={selList}/>}
                <List sx={{height: '75%', overflow:'scroll'}}>
                    {selList?.tasks?.map(task => {
                        return <Task key={task._id} setSelList={setSelList} selList={selList} task={task}/>
                    })}
                </List>
            </Paper> */}
        </Container>
    )
}

export default Home

{/* <EditBtn list={list} user={user}/> */}