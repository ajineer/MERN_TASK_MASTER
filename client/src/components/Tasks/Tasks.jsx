import { format } from "date-fns"
import { useTaskContext } from "../../hooks/useTaskContext"
import { useMemo } from "react"
import Task from "./Task/Task"
import NewTaskForm from "../NewTaskForm/NewTaskForm"
import './Tasks.css'


const Tasks = ({currentDate}) => {

  const {tasks, dispatch} = useTaskContext()
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => 
        format(task.date, 'yyyy/MM/dd') === format(currentDate, 'yyyy/MM/dd') && task
    )
  },[currentDate, tasks])

  return (
    <div className="tasks-taskform">
      <NewTaskForm currentDate={currentDate}/>
      <ul className="tasks-container">
          {filteredTasks.map((task, index) => {
            return <Task key={`${task.name}_${index}`} task={task} currentDate={currentDate}/>
          })}
      </ul>
    </div>
  )
}

export default Tasks