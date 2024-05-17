import { useState } from "react"
import './Calendar.css'
import { primary } from "../../../styles/colors"
import Tasks from "../../Tasks/Tasks"
import DayGrid from "../DayGrid/DayGrid"
import MonthYearSelector from "../MonthYearSelector/MonthYearSelector"

const Calendar = ({currentDate, setCurrentDate}) => {
    const [collapsed, setCollapsed] = useState(false)
    
    return (

        // <div>
        //     <button onClick={() => setCollapsed(prev => !prev)}>{!collapsed ? '+' : '-'}</button>
        //     <div className={`expander ${collapsed && 'expanded'}`}>
        //         <div className="expanded-content">
        //             <span className="content">
        //                 Lorem ipsum dolor sit amet consectetur adipisicing elit. <br/>
        //                 Vero optio esse, iure, minus impedit nesciunt at laboriosam <br/>
        //                 assumenda ab aut cumque? Laboriosam sequi blanditiis alias! <br/>
        //                 Pariatur id suscipit laudantium laborum?
        //             </span>
        //         </div>
        //     </div>
        // </div>
        
        <section className="calendar-container">
            <div
                className="calendar-header"
            >
                <MonthYearSelector currentDate={currentDate} setCurrentDate={setCurrentDate}/>
                <span
                    style={{
                        display: 'flex',
                        fontSize:"1.5rem",
                        alignItems: 'center',
                    }}
                >
                    <button className='collapse-button' onClick={() => setCollapsed(prev => !prev)}>
                        {!collapsed ? <i>{'\u002B'}</i> : <i>{'\u2212'}</i>}
                    </button>
                </span>
            </div>
            <div className={`expander ${collapsed && 'expanded'}`}>
                <div className="expanded-content">
                    <DayGrid currentDate={currentDate} setCurrentDate={setCurrentDate} />
                </div>
            </div>
        </section>
  )
}

export default Calendar