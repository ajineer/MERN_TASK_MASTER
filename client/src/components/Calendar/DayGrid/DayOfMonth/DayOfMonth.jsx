import { format, isToday } from "date-fns"
import './DayOfMonth.css'

const DayOfMonth = ({dateKey, index, currentDate, setCurrentDate, day, taskByDate}) => {
  return (
    <div className='day_of_month'
        key={index}
        style={{
            backgroundColor: isToday(day) ? 'blue' : '', 
            border: day.getDate() === currentDate.getDate() ? 'orange solid 2px' : 'white solid 2px', 
        }}
        onClick={() => {setCurrentDate(day)}}
    >
        <span className="day_of_month_content">
            {format(day, 'd')}   
            {taskByDate[dateKey] && <i style={{color: 'red'}}>{'\u2739'}</i>}
        </span>
    </div>
  )
}

export default DayOfMonth