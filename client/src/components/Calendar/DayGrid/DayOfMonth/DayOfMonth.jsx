import { format, isToday } from "date-fns"
import './DayOfMonth.css'

const DayOfMonth = ({dateKey, index, currentDate, setCurrentDate, day, taskByDate}) => {
  return (
    <div className='day_of_month'
        key={index}
        style={{
            backgroundColor: isToday(day) ? 'lightgrey' : '', 
            border: day.getDate() === currentDate.getDate() ? 'orange solid 2px' : 'white solid 2px', 
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