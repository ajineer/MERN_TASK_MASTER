import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setTaskName, setTaskDate, setTaskStatus, resetTask} from '../../reduxStore/taskSlice';
import { addTask, removeTask, clearTasks, setTasks, updateTasks } from '../../reduxStore/listSlice';
import Task from '../../Components/Task/Task';

const Home = () => {

  const dispatch = useDispatch();
  const task = useSelector(state => state.task);
  const taskList = useSelector(state => state.list.list);
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
      e.preventDefault()
      const response = await fetch('http://localhost:3000/tasks', {
          method: "POST",
          headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        }   
    )
    if(!response.ok){
        setError(response.error)
    }
    const json = await response.json()
    dispatch(addTask(json))
    dispatch(resetTask())

}

useEffect(() => {
    const fetchTasks = async () => {
        const response = await fetch('http://localhost:3000/tasks')
        const json = await response.json()
        if(!response.ok){
            setError(response.error)
            return
        }
        dispatch(setTasks(json))
    }
    fetchTasks()
},[])

  return (
    <div>
        <ul>
            {taskList.map(t => {
                return <Task t={t}/>
                
            })}
        </ul>
        <form onSubmit={(e) => handleSubmit(e)}>
            <input
                type='text'
                placeholder=''
                required
                value={task.name}
                onChange={(e) => {
                    dispatch(setTaskName(e.target.value))
                    dispatch(setTaskDate('2024/08/19'))
                    dispatch(setTaskStatus(0))
                }}
            />
            <input
                type="submit"
                value="add task"
            />
        </form>
        {error && <span>{error}</span>}
    </div>
  )
}

export default Home