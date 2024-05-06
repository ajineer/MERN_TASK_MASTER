import { useAuthContext } from "../../../hooks/useAuthContext"
import { useState } from "react"
import { postTaskReq } from "../../../routes/taskRoutes"
import { useTaskContext } from "../../../hooks/useTaskContext"
import { format } from "date-fns"

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
        <form style={{display: 'flex', margin: '1rem 0 0 1rem'}} onSubmit={(e) => handleSubmit(e)}>
            <input onChange={(e) => setTaskForm({
                name: e.target.value,
                status: taskForm.status,
                date: format(currentDate, 'yyyy/MM/dd')
                })} 
                required 
                maxLength={20} 
                placeholder="enter task"/>
            <button style={{width: 'fit-content'}} type="submit">+</button>
        </form>
    )
}

export default NewTaskForm