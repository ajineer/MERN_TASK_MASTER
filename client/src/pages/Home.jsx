import { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { Box, Container, List, Paper, Typography } from '@mui/material'

// components

// routes
import Task from '../components/Task'
import NewTaskForm from '../components/NewTaskForm'
import { accent1, primary, secondary } from '../styles/colors';
import { useTaskContext } from '../hooks/useTaskContext';
import { fetchTasksReq } from '../routes/taskRoutes';
import Calendar from '../components/Calendar'
import dayjs from 'dayjs'

const Home = () => {
    const {tasks, dispatch} = useTaskContext()
    const {user} = useAuthContext()
    const initialValue = dayjs(new Date())

    useEffect(() => {
        const fetchTasks = async () => {
            const response = await fetchTasksReq(user)
            const json = await response.json()
            if (response.ok){
                dispatch({type: 'SET_TASKS', payload: json})
            }
        }
        
        if(user){
            fetchTasks()
        }
    },[dispatch, user])

    return (
        <Container>
            <Calendar initialValue={initialValue}/>
            {/* <Container sx={{display: 'flex', flexDirection: 'column', height: '85%'}}> */}
                {/* <Box sx={{backgroundColor: 'white', padding: '2px'}}>
                    <Typography sx={{backgroundColor: primary}}>Primary</Typography>
                    <Typography sx={{backgroundColor: secondary}}>Secondary</Typography>
                    <Typography sx={{backgroundColor: accent1}}>Accent1</Typography>
                </Box> */}
            {/* </Container> */}
            <Paper sx={{height: {md: '70%', sm: '40%', xs: '40%'}, width: {md: '75%', sm: '100%', xs: '100%'}, margin: '1rem auto 0 auto', paddingBottom: '2rem', overflow: 'hidden'}}>
                <NewTaskForm />
                <List sx={{overflow: 'scroll', height: '85%'}}>
                {tasks?.map(task => 
                    <Task key={task._id} task={task}/>
                    )}
                    </List>
            </Paper>
        </Container>
    )
}

export default Home