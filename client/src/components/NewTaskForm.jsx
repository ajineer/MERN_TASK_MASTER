import { TextField } from "@mui/material"
import { postTaskReq } from "../routes/taskRoutes"
import { useAuthContext } from "../hooks/useAuthContext"
import { useListContext } from "../hooks/useListContext"
import { useState } from "react"

const NewTaskForm = () => {

    const {user} = useAuthContext()
    const {lists, dispatch} = useListContext()
    const [taskForm, setTaskForm] = useState({
        name: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await postTaskReq(taskForm, user)
        const json = await response.json()
        if(response.ok){
            const updatedList = lists.filter((l._id) === json.list)
            dispatch({type: 'UPDATE_LIST', payload: updatedList})
        }else{
            console.log(json.error)
        }

    }

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <TextField onChange={(e) => setTaskForm({name: e.target.value})} placeholder="enter task"/>
        </form>
    )
}

export default NewTaskForm