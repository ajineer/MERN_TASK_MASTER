import { useAuthContext } from "../../../hooks/useAuthContext"
import { useState } from "react"
import { postTaskReq } from "../../../routes/taskRoutes"
import { useTaskContext } from "../../../hooks/useTaskContext"
import { format } from "date-fns"
import './NewTaskForm.css'

const NewTaskForm = ({currentDate}) => {

    // const updateDate = useMemo(() => {},[currentDate])

    const {user} = useAuthContext()
    const {tasks, dispatch} = useTaskContext()
    const [taskForm, setTaskForm] = useState({
        name: '',
        status: false,
        date: ''

    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await postTaskReq(user, taskForm)
        const json = await response.json()
        if(response.ok){
            dispatch({type: "CREATE_TASK", payload: json})
            e.target.reset()
        }else{
            console.log(json.error)
        }
    }

    return (
        <form
            className='new-task'
            onSubmit={(e) => handleSubmit(e)}
        >
            <div className="form-group">
                <input 
                    className='form-input'    
                    onChange={(e) => setTaskForm({
                        name: e.target.value,
                        status: taskForm.status,
                        date: format(currentDate, 'yyyy/MM/dd')
                    })} 
                    required 
                    maxLength={20} 
                    placeholder=""
                />  
                <label className="form-label" htmlFor="floatingInput">Enter new task</label>
            </div>
            <input className="form-button" type="submit" value='+'/>
        </form>
    )
}

export default NewTaskForm