import { TaskContext } from "../context/TaskContext.jsx";
import { useContext } from "react";

export const useTaskContext = () => {
    const context = useContext(TaskContext)

    if(!context){
        throw Error('useTaskContext must be used inside TaskContextProvider')
    }

    return context
}