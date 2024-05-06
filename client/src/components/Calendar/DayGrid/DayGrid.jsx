import { useMemo } from 'react'
import { useTaskContext } from '../../../hooks/useTaskContext'
import { eachDayOfInterval, endOfMonth, format, getDay, isToday, startOfMonth, addMonths, subMonths, subDays, addDays } from 'date-fns'
import './DayGrid.css'
import DayOfMonth from './DayOfMonth/DayOfMonth'

const DayGrid = ({currentDate, setCurrentDate}) => {

  const WEEKDAYS = ['Sun', 'Mon', 'Tue', "Wed", "Thu", "Fri", "Sat"]
  const firstDayOfMonth = startOfMonth(currentDate)
  const lastDayOfMonth = endOfMonth(currentDate)
  const startingDayIndex = getDay(firstDayOfMonth)
  const {tasks, dispatch} = useTaskContext()
  const taskByDate = useMemo(() => {
    return tasks?.reduce((acc, task) => {
        const dateKey = format(task.date, 'MMMM/dd/yyyy')
        if(!acc[dateKey]){
            acc[dateKey] = true
        }
        return acc
    }, {})
}, [tasks])

  let daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth
})
  
  return (
    
    
    <div className="day_grid">
        {WEEKDAYS.map((day) => {
            return (
                <div className='week-day' key={day}>
                    {day}
                </div>
            )
        })}
        {Array.from({ length: startingDayIndex}).map((_, index) => {
            return <div key={`empty-${index}`}/>
        })}
        {daysInMonth.map((day, index) => {
            const dateKey = format(day, 'MMMM/dd/yyyy')
            return (
                <DayOfMonth currentDate={currentDate} setCurrentDate={setCurrentDate} key={index} dateKey={dateKey} index={index} day={day} taskByDate={taskByDate}/>
            )
        })}
    </div>
  )
}

export default DayGrid