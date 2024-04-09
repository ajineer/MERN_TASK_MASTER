import { useEffect, useState, useRef } from 'react';
import dayjs from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import { useTaskContext } from '../hooks/useTaskContext';


export default function DateCalendarServerRequest({initialValue}) {
    // const initialValue = dayjs(new Date())
    /**
     * Mimic fetch with abort controller https://developer.mozilla.org/en-US/docs/Web/API/AbortController/abort
     * ⚠️ No IE11 support
     */
    function fakeFetch(initialValue, tasks, { signal }) {
    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
        const daysToHighlight = tasks.map(t => {
            return (t.date.get('month') === initialValue.get('month') && t.date.get('year') === initialValue.get('year')) ? t.date.get('date') : ''
        })
        console.log('look here: ', daysToHighlight)
        
        resolve({daysToHighlight});
        }, 500);

        signal.onabort = () => {
        clearTimeout(timeout);
        reject(new DOMException('aborted', 'AbortError'));
        };
    });
    }


    function ServerDay(props) {
        const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

        const isSelected =
            !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;

        return (
            <Badge
            key={props.day.toString()}
            overlap="circular"
            badgeContent={isSelected ? '🌚' : undefined}
            >
            <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
            </Badge>
        );
        }

    const { tasks, dispatch } = useTaskContext()
    const requestAbortController = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [highlightedDays, setHighlightedDays] = useState([]);

    const fetchHighlightedDays = (date) => {
        const controller = new AbortController();
        fakeFetch(date, tasks, {
        signal: controller.signal,
        })
        .then(({ daysToHighlight }) => {
            setHighlightedDays(daysToHighlight);
            setIsLoading(false);
        })
        .catch((error) => {
            // ignore the error if it's caused by `controller.abort`
            if (error.name !== 'AbortError') {
            throw error;
            }
        });

        requestAbortController.current = controller;
    };

    useEffect(() => {
        fetchHighlightedDays(initialValue);
        // abort request on unmount
        return () => requestAbortController.current?.abort();
    }, []);

    const handleMonthChange = (date) => {
        if (requestAbortController.current) {
        // make sure that you are aborting useless requests
        // because it is possible to switch between months pretty quickly
        requestAbortController.current.abort();
        }

        setIsLoading(true);
        setHighlightedDays([]);
        fetchHighlightedDays(date);
    };
    const handleYearChange = (date) => {
        if (requestAbortController.current) {
        // make sure that you are aborting useless requests
        // because it is possible to switch between months pretty quickly
        requestAbortController.current.abort();
        }

        setIsLoading(true);
        setHighlightedDays([]);
        fetchHighlightedDays(date);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
            defaultValue={initialValue}
            loading={isLoading}
            onMonthChange={handleMonthChange}
            onYearChange={handleYearChange}
            renderLoading={() => <DayCalendarSkeleton />}
            // customize the rendering of different parts of the calendar such as day, week, month, etc...
            slots={{
            day: ServerDay,
            }}
            slotProps={{
            day: {
                highlightedDays,
            },
            }}
        />
        </LocalizationProvider>
    );
}