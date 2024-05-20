import { format, isToday } from "date-fns"
import './DayOfMonth.css'

const DayOfMonth = ({dateKey, index, currentDate, setCurrentDate, day, taskByDate}) => {
  return (
    <div className='day_of_month'
        key={index}
        style={{
            backgroundColor: isToday(day) ? 'var(--secondary)' : '', 
            color: isToday(day) ? 'white': '',
            boxShadow: day.getDate() === currentDate.getDate() ? 'inset 0 0 0 2px orange' : 'inset 0 0 0 2px white'
        }}
        onClick={() => {setCurrentDate(day)}}
    >
        <div className="day_of_month_content">
            <span className={taskByDate[dateKey] && 'highlight-day'}>
              {format(day, 'd')} 
            </span>
        </div>
    </div>
  )
}

export default DayOfMonth