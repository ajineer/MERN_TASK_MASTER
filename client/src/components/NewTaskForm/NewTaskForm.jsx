import { useState, useMemo } from "react"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useTaskContext } from "../../hooks/useTaskContext"
import './NewTaskForm.css'
import '../../styles/FloatingInput.css'
import { postTaskReq } from "../../routes/taskRoutes"
import { format } from "date-fns"

const NewTaskForm = ({currentDate}) => {
  
  const {user} = useAuthContext()
  const {tasks, dispatch} = useTaskContext()
  const [taskForm, setTaskForm] = useState({
    name: '',
    date: format(currentDate, 'MMMM/dd/yyyy'),
    status: false
  })
  
  const setDate = useMemo(() => {
    setTaskForm({...taskForm, date: format(currentDate, 'MMM/dd/yyyy')})
  },[currentDate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await postTaskReq(user, taskForm)
    const json = await response.json()
    if(response.ok){
      dispatch({type: 'CREATE_TASK', payload: json})
      e.target.reset()
    }else{
      console.log(response.error)
    }
  }

  return (
    <form className="new-task-form" onSubmit={(e) => handleSubmit(e)}>
      <div>
        <h4>{format(currentDate.getDay(), 'EEEE')}, {format(currentDate, "MMMM/dd/yyyy")}</h4>
      </div>
      <div className="form-group">
        <input 
          className="form-input"
          placeholder=""
          type="text"
          required 
          maxLength={20} 
          onChange={(e) => setTaskForm({...taskForm, name: e.target.value})}
          />
        <label className="form-label" htmlFor="floatingInput">enter task</label>
        <input 
          className='add-task'
          type='submit'
          value='+'
        />
      </div>
    </form>
  )
}

export default NewTaskForm