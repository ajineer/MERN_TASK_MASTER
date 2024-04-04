import { Box, Container, Typography, Select, MenuItem, Paper, Grid, ListItem } from "@mui/material";
import { ArrowRight, ArrowLeft, Circle } from "@mui/icons-material";
import { eachDayOfInterval, endOfMonth, format, getDay, isToday, startOfMonth, addMonths, subMonths, subDays, addDays } from "date-fns";
import { useMemo, useState } from "react";
import { primary, secondary, accent1 } from "../styles/colors";

const Calendar = () => {

    const events = []
    const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', "Wednesday", "Thursday", "Friday", "Saturday"]
    const [currentDate, setCurrentDate] = useState(new Date())
    const firstDayOfMonth = startOfMonth(currentDate)
    const lastDayOfMonth = endOfMonth(currentDate)
    const startingDayIndex = getDay(firstDayOfMonth)
    const eventsByDate = useMemo(() => {
        return events.reduce((acc, event) => {
            const dateKey = format(event.date, `yyyy-MM-dd`)
            if (!acc[dateKey]) {
                acc[dateKey] = []
            }
            acc[dateKey].push(event)
            return acc
        }, {})
    }, [events])

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
        const selectedYear = parseInt(event.target.value);
        setCurrentDate((prevDate) => {
            const newDate = new Date(prevDate);
            newDate.setFullYear(selectedYear);
            return newDate;
        });
    };

    return (
        <>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <ArrowLeft sx={{fontSize: '4rem'}} onClick={handlePrevMonth} />
                <Typography variant="h4" element='h4' sx={{
                    fontSize: {
                        xs: '20px', 
                        sm: '24px',  
                        md: '30px',  
                        lg: '36px',  
                        xl: '45px',  
                        },
                    }}
                >
                    {format(currentDate, "MMMM")}
                </Typography>
                <ArrowRight sx={{fontSize: '4rem'}} onClick={handleNextMonth} />
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Select value={format(currentDate, "yyyy")} onChange={handleChangeYear} sx={{"& .MuiSelect-icon": {display: 'none'}}} >
                        {Array.from({ length: 21 }).map((_, index) => {
                            const year = new Date().getFullYear() - 10 + index;
                            return <MenuItem key={year} value={year} sx={{backgroundColor: 'lightgrey'}}>
                                <Typography variant="h4" element="h4" sx={{
                                    color: 'black',
                                    fontSize: {
                                        xs: '20px', 
                                        sm: '24px',  
                                        md: '30px',  
                                        lg: '36px',  
                                        xl: '45px',  
                                        },
                                    }} 
                                >
                                    {year}
                                </Typography>
                            </MenuItem>;
                        })}
                    </Select>
                </Box>
            </Box>
            <Grid container spacing={2}>
                
                {/* week view at top of calendar */}
                {WEEKDAYS.map((day) => (
                    <Grid item key={day} xs={1.71} >
                        <Typography sx={{display: 'flex', justifyContent: 'center'}}>
                            {day.substring(0,3)}
                        </Typography>
                    </Grid>
                ))}

                {/*pad days at beginning of month so first day is on the right day of the week */}
                {Array.from({ length: startingDayIndex }).map((_, index) => (
                    <Grid item xs={1.71} key={`empty-${index}`} sx={{ padding: "2px" }} />
                ))}

                {/* days of the month */}
                {daysInMonth.map((day, index) => {
                    const dateKey = format(day, `yyyy-MM-dd`)
                    const todaysEvents = eventsByDate[dateKey] || []
                    return (
                        <Grid
                            item
                            xs={1.71}
                            sx={{  
                                backgroundColor: isToday(day) ? 'yellow' : '', 
                                padding: '2px', 
                                border: day.getDate() === currentDate.getDate() ? 'orange solid 2px' : 'black solid 2px', 
                                borderRadius: '10%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }} 
                            onClick={() => setCurrentDate(day)}
                        >

                            <Typography sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', border: '2px solid red',}}>
                                    {format(day, "d")}
                                    {eventsByDate[dateKey] ? <Circle/> : '' }
                                    {/* {todaysEvents.map((event, eventIndex) => (
                                        <Circle key={`${event.title}-${eventIndex}`} sx={{color: 'red', fontSize: '12px', alignSelf: 'center'}} />
                                        ))} */}
                            </Typography>
                        </Grid>
                    )
                })}
            </Grid>
            {/* <Box sx={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2 }}>
                {WEEKDAYS.map((day) => (
                    <Box key={day} textAlign="center">
                        {day}
                    </Box>
                ))}
                {Array.from({ length: startingDayIndex }).map((_, index) => (
                    <Box key={`empty-${index}`} sx={{ padding: "2px", textAlign: "center" }} />
                ))}
                {daysInMonth.map((day, index) => {
                    const dateKey = format(day, `yyyy-MM-dd`)
                    const todaysEvents = eventsByDate[dateKey] || []
                    return (
                        <Box key={index} sx={{ display: 'flex', alignItems: 'start', justifyContent: 'center', width: '9rem', height: '2rem', backgroundColor: isToday(day) ? secondary : '', padding: '2px', border: day.getDate() === currentDate.getDate() ? 'orange solid 2px' : 'white solid 2px', borderRadius: '10%' }} onClick={() => setCurrentDate(day)}>
                            <Typography sx={{display: 'flex', flexDirection: 'column', alignSelf: 'flex-start'}}>
                                {format(day, "d")}
                                {todaysEvents.map((event, eventIndex) => (
                                    <Circle key={`${event.title}-${eventIndex}`} sx={{color: 'red', fontSize: '12px', alignSelf: 'center'}} />
                                ))}
                            </Typography>
                        </Box>
                    )
                })}
            </Box> */}
        </>
    );
};

export default Calendar;
