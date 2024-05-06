import { useEffect, useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { accent1, primary, secondary } from '../../styles/colors';
import { useTaskContext } from '../../hooks/useTaskContext';
import { fetchTasksReq } from '../../routes/taskRoutes';
import Calendar from '../../components/Calendar/CalendarContainer/Calendar'

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
        <Calendar/>
        // <Container>
        //     <Calendar/>
        // </Container>
        // <Container sx={{display: 'flex', flexDirection: 'column', height: '85%'}}> */}
        //     <Box sx={{backgroundColor: 'white', padding: '2px'}}>
        //         <Typography sx={{backgroundColor: primary}}>Primary</Typography>
        //         <Typography sx={{backgroundColor: secondary}}>Secondary</Typography>
        //         <Typography sx={{backgroundColor: accent1}}>Accent1</Typography>
        //     </Box>
        // </Container>
    )
}

export default Home