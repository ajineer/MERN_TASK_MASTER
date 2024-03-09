import { ListItem } from "@mui/material"

const Task = ({ selList, task }) => {
    
    return (

        <ListItem>
            {task.name}
        </ListItem>
    )
}

export default Task