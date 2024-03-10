import { Button, TextField } from "@mui/material"
import { useAuthContext } from "../hooks/useAuthContext"
import { useListContext } from "../hooks/useListContext"
import { useState } from "react"
import { postTaskReq } from "../routes/listRoutes"

const NewTaskForm = ({setSelList, selList}) => {

    const {user} = useAuthContext()
    const {lists, dispatch} = useListContext()
    const [taskForm, setTaskForm] = useState({
        name: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await postTaskReq(selList, taskForm, user)
        const json = await response.json()
        if(response.ok){
            setSelList({...selList, tasks: [...selList.tasks, json]})
            dispatch({type: "UPDATE_LIST", payload: selList})
            e.target.reset()
        }else{
            console.log(json.error)
        }

    }

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <TextField onChange={(e) => setTaskForm({name: e.target.value})} placeholder="enter task"/>
            <Button type="submit">+</Button>
        </form>
    )
}

export default NewTaskForm