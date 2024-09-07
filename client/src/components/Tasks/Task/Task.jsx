import { useAuthContext } from "../../../hooks/useAuthContext"
import { useEffect, useMemo, useState } from "react"
import { useTaskContext } from "../../../hooks/useTaskContext"
import { deleteTaskReq, patchTaskReq } from "../../../routes/taskRoutes"
import './Task.css'
import { accent3, green, hoveredGreen, hoveredRed, red, secondary } from "../../../styles/colors"
import EditModal from "./EditModal"

const Task = ({task, currentDate}) => {

  const {user} = useAuthContext()
  const {tasks, dispatch} = useTaskContext()
  const [edit, setEdit] = useState(false)
  const [editTaskForm, setEditTaskForm] = useState(task)
  const [hovered, setHovered] = useState(false)

  
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
      onKeyDown={(e) => e.key === "Escape" && edit && (setEdit(false), setEditTaskForm(task))}
      style={{
          borderLeft: `${edit ? `2px solid ${secondary}` : `2px solid ${editTaskForm.status ? (hovered ? hoveredGreen : green) : (hovered ? hoveredRed : red)}`}`
        }}  
      >
            <div className="task-details">

              {/* first child of task-details */}
              <form
                className="check-box-form"
                onSubmit={(e) => handleEdit(e)}
                style={{backgroundColor: edit && accent3}}
                >
                <button
                  type='submit'
                  className="check-box"
                  style={{
                    borderStyle: 'none',
                    // boxShadow: `inset 0 0 0 2px ${editTaskForm.status ? (hovered ? hoveredGreen : green) : (hovered ? hoveredRed : red)}`,
                    boxShadow: `${edit ? `inset 0 0 0 2px ${secondary}` : `inset 0 0 0 2px ${editTaskForm.status ? (hovered ? hoveredGreen : green) : (hovered ? hoveredRed : red)}`}`,
                    pointerEvents: edit && 'none',
                  }}
                  onClick={() => handleToggle()}
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                  >
                  {editTaskForm.status ? <i>{'\u2714'}</i> : <i>&nbsp;&nbsp;&nbsp;</i>}
                </button>
              </form>

              {/*second child of task-details */}
                {edit? 
                  <EditModal taskDate={task.date} handleEdit={handleEdit} setEdit={setEdit} editTaskForm={editTaskForm} setEditTaskForm={setEditTaskForm}/> :
                  <h5
                    style={{
                      textDecoration: `${editTaskForm.status ? 'line-through' : ''}`
                    }}
                    >
                    {editTaskForm.name}
                  </h5>
                }
                {/*third child of task-details */}
                <div className='task-buttons'>
                  <button
                    onClick={() => {setEditTaskForm(task), setEdit(prev => !prev)}}
                  >
                    {edit ? '<':'\u270E'}
                  </button>

                {/*fourth child of task-details */}
                  <button 
                    onClick={(e) => handleDelete(e)}
                    >
                    X
                  </button>
                </div>
          </div>
    </li>)
  }
  
  export default Task