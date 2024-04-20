import { useState, useMemo } from "react"
import { useTaskContext } from "../../hooks/useTaskContext"
import { eachDayOfInterval, endOfMonth, format, getDay, isToday, startOfMonth, addMonths, subMonths, subDays, addDays } from 'date-fns'
import './Calendar.css'
import { primary } from "../../styles/colors"
import Tasks from '../Tasks/Tasks'

const Calendar = () => {
    const WEEKDAYS = ['Sun', 'Mon', 'Tue', "Wed", "Thu", "Fri", "Sat"]
    const [currentDate, setCurrentDate] = useState(new Date())
    const firstDayOfMonth = startOfMonth(currentDate)
    const lastDayOfMonth = endOfMonth(currentDate)
    const startingDayIndex = getDay(firstDayOfMonth)
    const {tasks, dispatch} = useTaskContext()
    const [collapsed, setCollapsed] = useState(false)

    const taskByDate = useMemo(() => {
        return tasks?.reduce((acc, task) => {
            const dateKey = format(task.date, 'yyyy-MM-dd')
            if(!acc[dateKey]){
                acc[dateKey] = []
            }
            acc[dateKey].push(task)
            return acc
        }, {})
    }, [tasks])

    let daysInMonth = eachDayOfInterval({
        start: firstDayOfMonth,
        end: lastDayOfMonth
    })
    const handleNextMonth = () => {
        setCurrentDate(addMonths(currentDate, 1));
    }

    const handlePrevMonth = () => {
        setCurrentDate(subMonths(currentDate, 1));
    }

    const handleChangeYear = (event) => {
        const selectedYear = parseInt(event.target.value)
        setCurrentDate((prevDate) => {
            const newDate = newDate(prevDate)
            newDate.setFullYear(selectedYear)
            return newDate
        })
    }
    
    return (
        <section className="calendar_container">
                <div
                    onClick={() => setCollapsed(prev => !prev)}
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <span>
                        Calendar
                    </span>
                    <span
                        style={{
                            display: 'flex',
                            fontSize:"1.5rem",
                            alignItems: 'center',
                            border: '2px solid red',
                        }}
                    >
                        {collapsed ? <i>{'\u002B'}</i> : <i>{'\u2212'}</i>}
                    </span>
                </div>
                <div
                    style={{
                        height: collapsed ? '0' : '11rem',
                        transitionProperty: 'height',
                        transitionDuration: '200ms',
                        overflow: 'hidden',
                    }}
                >
                    <div className='month_year_selectors'>
                            <div className="month_selector">
                                <i onClick={handlePrevMonth}>{'\u276E'}</i>
                                <span>{format(currentDate, "MMMM")}</span>
                                <i onClick={handleNextMonth}>{'\u276F'}</i>
                            </div>
                            <div className="year_selector">
                                <select value={format(currentDate, 'yyyy')} onChange={handleChangeYear}>
                                    {Array.from({ length: 21 }).map((_, index) => {
                                        const year = new Date().getFullYear() - 10 + index
                                        return <option key={year} value={year}>{year}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                    <div className="day_grid">
                        {WEEKDAYS.map((day) => {
                            return (
                                <div key={day}>
                                    {day}
                                </div>
                            )
                        })}
                        {Array.from({ length: startingDayIndex}).map((_, index) => {
                            <div key={`empty-${index}`}/>
                        })}
                        {daysInMonth.map((day, index) => {
                            const dateKey = format(day, 'yyyy-MM-dd')
                            const todaysTasks = taskByDate[dateKey] || []
                            return (
                                <div className='day_of_month'
                                    key={index}
                                    style={{
                                        backgroundColor: isToday(day) ? 'blue' : '', 
                                        border: day.getDate() === currentDate.getDate() ? 'orange solid 2px' : 'white solid 2px', 
                                    }}
                                    onClick={() => setCurrentDate(day)}
                                >
                                    {format(day, 'd')}   
                                </div>
                            )
                        })}
                    </div>
                </div>
                <Tasks currentDate={currentDate}/>
        </section>
  )
}

export default Calendar