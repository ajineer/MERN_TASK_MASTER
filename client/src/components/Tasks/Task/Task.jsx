import { useAuthContext } from "../../../hooks/useAuthContext"
import { useEffect, useMemo, useState } from "react"
import { useTaskContext } from "../../../hooks/useTaskContext"
import { deleteTaskReq, patchTaskReq } from "../../../routes/taskRoutes"
import './Task.css'
import { green, red } from "../../../styles/colors"

const Task = ({task, currentDate}) => {

  const {user} = useAuthContext()
  const {tasks, dispatch} = useTaskContext()
  const [edit, setEdit] = useState(false)
  const [editTaskForm, setEditTaskForm] = useState(task)

  
  const handleDelete = async (e) => {
    const response = await deleteTaskReq(task, user)
    const json = await response.json()
    if(response.ok){
      dispatch({type:'DELETE_TASK', payload: json})
    }
  }
  
  const handleToggle = () => {
    setEditTaskForm(prev => ({...prev, status: !prev.status}))
  }
  
  const handleEdit = async (e) => {
    
    e.preventDefault()
    const response = await patchTaskReq(editTaskForm, user)
    const json = await response.json()
    if(response.ok){
      setEdit(false)
      dispatch({type: 'UPDATE_TASK', payload: json})
    }
  }
  
  return (
    <li 
    className='task-container'
    style={{
        border: editTaskForm.status ? `2px solid ${green}` : `2px solid ${red}`,
      }}  
    >
      {edit && 
      <form 
        className="edit-task"
        onSubmit={(e) => handleEdit(e)}
      >
        <input
          className="exit-edit"
          type='button'
          value='X'
          onClick={() => setEdit(false)}
        />
        <input
          className="placeholder-edit"
          placeholder={editTaskForm.name}
          onChange={(e) => setEditTaskForm({...editTaskForm, name: e.target.value})}
        />
      </form>}

      <div className="task-details">

        {/* first child of task-details */}
        <form
          className="check-box-form"
          onSubmit={(e) => handleEdit(e)}
        >
          <button
            type='submit'
            className="check-box"
            style={{
              border: `1px solid ${editTaskForm.status ? green : red}`,
            }}
            onClick={() => handleToggle()}
            >
            {editTaskForm.status ? <i>{'\u2714'}</i> : <i>&nbsp;&nbsp;&nbsp;</i>}
          </button>
        </form>

        {/*second child of task-details */}
        <h5
          style={{
            textDecoration: `${editTaskForm.status ? 'line-through' : ''}`
          }}
          >
          {editTaskForm.name}
        </h5>

        {/*third child of task-details */}
        <div className='task-buttons'>
          <button
            onClick={() => setEdit(true)}
            >{'\u270E'}
          </button>

          {/*fourth child of task-details */}
          <button 
            onClick={(e) => handleDelete(e)}
            >
            X
          </button>
        </div>
      </div>
    </li>
  )
}

export default Task