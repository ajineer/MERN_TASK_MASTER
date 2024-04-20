import { format } from "date-fns"
import { useTaskContext } from "../../hooks/useTaskContext"
import { useMemo } from "react"
import { Task } from '../Task'
import NewTaskForm from "../NewTaskForm/NewTaskForm"


const Tasks = ({currentDate}) => {

  const {tasks, dispatch} = useTaskContext()
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => 
        task.date === currentDate? task : ''
    )
  },[currentDate, tasks])

  return (
    <section>
        <div>
            <h4>{format(currentDate.getDay(), 'EEEE')}, {format(currentDate, "MMMM-dd-yyyy")}</h4>
        </div>
        <NewTaskForm currentDate={currentDate}/>
        <ui>
            {filteredTasks.map(task => {
                return <Task/>
            })}
        </ui>
    </section>
  )
}

export default Tasks