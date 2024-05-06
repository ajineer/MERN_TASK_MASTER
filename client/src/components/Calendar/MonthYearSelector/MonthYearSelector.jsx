import { format, addMonths, subMonths } from "date-fns"
import './MonthYearSelector.css'

const MonthYearSelector = ({currentDate, setCurrentDate}) => {

    const handleNextMonth = () => {
        setCurrentDate(addMonths(currentDate, 1));
    }

    const handlePrevMonth = () => {
        setCurrentDate(subMonths(currentDate, 1));
    }

    const handleChangeYear = (event) => {
        const currentDate = parseInt(event.target.value)
        setCurrentDate((prevDate) => {
            const newDate = new Date(prevDate)
            newDate.setFullYear(currentDate)
            return newDate
        })
    }


  return (
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
  )
}

export default MonthYearSelector