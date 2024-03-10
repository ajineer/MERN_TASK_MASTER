import { Box, Button, Checkbox, ListItem, TextField, Typography } from "@mui/material"
import { deleteTaskReq, patchTaskReq } from "../routes/taskRoutes"
import { useAuthContext } from "../hooks/useAuthContext"
import { useListContext } from "../hooks/useListContext"
import { useEffect, useState } from "react"

const Task = ({ setSelList, selList, task}) => {
    
    const {user} = useAuthContext()
    const {lists, dispatch} = useListContext()
    const [edit, setEdit] = useState(false)
    const [editTaskForm, setEditTaskForm] = useState({
        name: '',
        status: false
    })
    const list = lists.filter(l => l._id === task.list)

    useEffect(() => {
        setEditTaskForm({...task})
    },[selList, task])

    const handleDelete = async (e) => {
        const response = await deleteTaskReq(task, user)
        const json = await response.json()
        if(response.ok){
            setSelList(json)
            dispatch({type: 'UPDATE_LIST', payload: json})
        }
    }

    const handleEdit = async (e) => {
        
        e.preventDefault()
        const response = await patchTaskReq(e, task, user)
        const json = await response.json()
        list.tasks?.map(t => {
            return t._id === task._id ? json : t
        })
        if(response.ok){
            setEditTaskForm({...json})
            dispatch({type: 'UPDATE_LIST', payload: list})
            setEdit(false)
        }
    }

    return (

        <ListItem>
           {edit?<form onSubmit={(e) => handleEdit(e)}>
                <TextField required name='name' placeholder={editTaskForm.name} type="text" onChange={(e) => setEditTaskForm({name: e.target.value})}></TextField>
            </form>:
            <Box>
                <Typography variant="span">
                    {editTaskForm.name}
                </Typography>
                <Button onClick={(e) => handleDelete(e)}>X</Button>
                <Button onClick={() => setEdit(true)}>/</Button>
                <Checkbox checked={editTaskForm.status} onChange={(e) => handleEdit(e)}/>
            </Box>}
        </ListItem>
    )
}

export default Task