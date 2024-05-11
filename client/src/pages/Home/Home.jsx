import { useEffect, useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { accent1, primary, secondary } from '../../styles/colors';
import { useTaskContext } from '../../hooks/useTaskContext';
import { fetchTasksReq } from '../../routes/taskRoutes';
import Calendar from '../../components/Calendar/CalendarContainer/Calendar'
import './Home.css'

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
        <section className="homepage-container">
            <Calendar/>
        </section>
    )
}

export default Home