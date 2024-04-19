import { useTaskContext } from "../hooks/useTaskContext"
import NewTaskForm from "./NewTaskForm"
import Task from "./Task"
import { List, Paper, Typography, Card, Container } from '@mui/material'

const Tasks = ({currentDate}) => {

  const {tasks, dispatch} = useTaskContext()

  return (
    
    <Container>
      <Card>
          <Typography 
            element='h4' 
            variant='h4'
            sx={{ width: 'fit-content', marginLeft: 'auto', marginRight: 'auto', marginTop: '1rem', border: '2px solid black'}}  
          >
            {currentDate.format('MMMM-DD-YYYY')}
          </Typography>
          <NewTaskForm />
          <List sx={{overflow: 'scroll', height: '85%'}}>
          {tasks?.map(task => 
              <Task key={task._id} task={task}/>
            )}
              </List>
      </Card>
    </Container>
    )
}
export default Tasks