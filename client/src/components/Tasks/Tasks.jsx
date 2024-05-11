import { format } from "date-fns"
import { useTaskContext } from "../../hooks/useTaskContext"
import { useEffect, useMemo } from "react"
import Task from "./Task/Task"
import NewTaskForm from "./NewTaskForm/NewTaskForm"
import './Tasks.css'


const Tasks = ({currentDate}) => {

  const {tasks, dispatch} = useTaskContext()
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => 
        task.date === format(currentDate, 'yyyy/MM/dd') && task
    )
  },[currentDate, tasks])

  return (
    <ul className="tasks-container">
        <NewTaskForm currentDate={currentDate}/>
        {filteredTasks.map((task, index) => {
            return <Task key={`${task.name}_${index}`} task={task} currentDate={currentDate}/>
        })}
    </ul>
  )
}

export default Tasks