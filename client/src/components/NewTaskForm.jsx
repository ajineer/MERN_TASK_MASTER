import { Button, TextField } from "@mui/material"
import { useAuthContext } from "../hooks/useAuthContext"
import { useListContext } from "../hooks/useListContext"
import { useState } from "react"
import { postTaskReq } from "../routes/listRoutes"

const NewTaskForm = ({index}) => {

    const {user} = useAuthContext()
    const {lists, dispatch} = useListContext()
    const [taskForm, setTaskForm] = useState({
        name: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await postTaskReq(lists[index], taskForm, user)
        const json = await response.json()
        if(response.ok){
            lists[index].tasks = [...lists[index].tasks, json]
            dispatch({type: "UPDATE_LIST", payload: lists[index]})
            e.target.reset()
        }else{
            console.log(json.error)
        }

    }

    return (
        <form style={{display: 'flex', margin: '1rem 0 0 1rem'}} onSubmit={(e) => handleSubmit(e)}>
            <input onChange={(e) => setTaskForm({name: e.target.value})} placeholder="enter task"/>
            <button style={{width: 'fit-content'}} type="submit">+</button>
        </form>
    )
}

export default NewTaskForm