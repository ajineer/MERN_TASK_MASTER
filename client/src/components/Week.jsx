import { Paper } from "@mui/material"
import { useAuthContext } from "../hooks/useAuthContext"
import { useTaskContext } from "../hooks/useTaskContext"
import Day from "./Day"

const Week = () => {
  
    const {user} = useAuthContext()
    const {tasks, dispatch} = useTaskContext()
    const days = ["Sunday","Monday, Tuesday, Wednesday, Thursday, Friday, Saturday"]
    
  return (
    <Paper>
        {days.map(day => {
            <Day day={day}/>
        })}
    </Paper>
  )
}

export default Week