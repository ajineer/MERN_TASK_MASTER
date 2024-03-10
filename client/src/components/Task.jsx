import { Button, ListItem } from "@mui/material"
import { deleteTaskReq } from "../routes/taskRoutes"
import { useAuthContext } from "../hooks/useAuthContext"
import { useListContext } from "../hooks/useListContext"

const Task = ({ setSelList, selList, task}) => {
    
    const {user} = useAuthContext()
    const {lists, dispatch} = useListContext()
    const handleDelete = async (e) => {
        const response = await deleteTaskReq(task, user)
        const json = await response.json()
        if(response.ok){
            setSelList(json)
            dispatch({type: 'UPDATE_LIST', payload: json})
        }
    }

    return (

        <ListItem>
            {task.name}<Button onClick={(e) => handleDelete(e)}>X</Button>
        </ListItem>
    )
}

export default Task