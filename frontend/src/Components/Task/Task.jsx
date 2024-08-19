import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setTaskName, setTaskDate, setTaskStatus, resetTask} from '../../reduxStore/taskSlice';
import { addTask, removeTask, clearTasks, setTasks, updateTasks } from '../../reduxStore/listSlice';

const Task = ({t}) => {

    const dispatch = useDispatch();
    const task = useSelector(state => state.task);
    const taskList = useSelector(state => state.list.list);
    const [error, setError] = useState(null)

    const handleDeleteTask = async (task) => {
        dispatch(removeTask(task))
        const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
            method: "DELETE"
        })
        if(!response.ok){
            setError(response.error)
        }
    }
    
    const handlePatchTask = async (task) => {
        console.log("updating task status: ", task)
        dispatch(updateTasks(task))
        const response = await fetch(`http://localhost:3000/tasks/${task.id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(task)
        })
        if(!response.ok){
            setError(response.error)
        }
    }
  return (
    <li style={{display:"flex", justifyContent: "center", maxHeight: "1.5rem", border: `2px solid ${t.status === 1 ? "green" : "red"}`}} key={t.id}>
        <span>{t?.name}</span>&nbsp;&nbsp;&nbsp;
        <span>{t?.date}</span>
        <input
            type='checkbox'
            checked={t.status === 1}
            onChange={(e) => {
                const updatedTask = {...t, status: e.target.checked ? 1 : 0}
                handlePatchTask(updatedTask)
            }}
        />
        <button style={{display: "flex", alignItems: "center", fontSize: "1.125rem", color: "red"}} onClick={() => handleDeleteTask(t)}>
            <span>{`\u2716`}</span>
        </button>
    </li>
  )
}

export default Task