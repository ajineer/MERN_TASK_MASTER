import { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { Box, Button, Container, Grid, List, ListItem, Paper, TextField, Typography } from '@mui/material'

// components

// routes
import Task from '../components/Task'
import NewTaskForm from '../components/NewTaskForm'
import { primary, secondary } from '../styles/colors';
import { useTaskContext } from '../hooks/useTaskContext';
import { fetchTasksReq } from '../routes/taskRoutes';
import Week from '../components/Week'

const Home = () => {
    const {tasks, dispatch} = useTaskContext()
    const {user} = useAuthContext()

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
        <Container sx={{display: 'flex', flexDirection: 'column', height: '85%'}}>
            <Week />
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