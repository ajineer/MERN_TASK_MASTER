import { deleteTaskReq, patchTaskReq } from "../../routes/taskRoutes"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useEffect, useState } from "react"
import { useTaskContext } from "../../hooks/useTaskContext"

const Task = ({task}) => {

  const {user} = useAuthContext()
  const {tasks, dispatch} = useTaskContext()
  const [edit, setEdit] = useState(false)
  const [editTaskForm, setEditTaskForm] = useState({
    name: '',
    status: false
  })
  useEffect(() => { 
    setEditTaskForm({...task})
  },[task])

  const handleDelete = async (e) => {
    const response = await deleteTaskReq(task, user)
    const json = await response.json()
    if(response.ok){
        dispatch({type:'DELETE_TASK', payload: json})
    }
  }

  const handleEdit = async (e) => {
        
    e.preventDefault()
    const response = await patchTaskReq(e, task, user)
    const json = await response.json()
    if(response.ok){
        setEditTaskForm({...json})
        setEdit(false)
    }
  }   

  return (
    <li>
        <form>

        </form>
        <h5>{editTaskForm.name}</h5>
        <div>
            <button onClick={(e) => handleDelete(e)}>X</button>
            <input
                checked = {editTaskForm.status} onChange={(e) => handleEdit(e)}
            />
        </div>
    </li>
  )
}

export default Task