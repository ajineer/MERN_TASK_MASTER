import { useTaskContext } from "../hooks/useTaskContext"
import NewTaskForm from "./NewTaskForm"
import Task from "./Task"
import { List, Paper } from '@mui/material'

const Tasks = () => {

  const {tasks, dispatch} = useTaskContext()

  return (
    
    <Paper sx={{height: {md: '70%', sm: '40%', xs: '40%'}, width: {md: '75%', sm: '100%', xs: '100%'}, margin: '1rem auto 0 auto', paddingBottom: '2rem', overflow: 'hidden'}}>
      
        <NewTaskForm />
        <List sx={{overflow: 'scroll', height: '85%'}}>
        {tasks?.map(task => 
            <Task key={task._id} task={task}/>
            )}
            </List>
    </Paper>
    )
}
export default Tasks