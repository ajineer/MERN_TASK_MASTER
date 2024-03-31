import { createContext, useReducer } from 'react'

export const TaskContext = createContext()

export const TaskReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TASKS': 
      return {
        tasks: action.payload
      }
    case 'CREATE_TASK':
      return {
        tasks: [action.payload, ...state.tasks]
      }
    case 'DELETE_TASK':
      return {
        tasks: state.tasks.filter((t) => t._id !== action.payload._id)
      }
    case 'UPDATE_TASK': 
    return {
        tasks: state.Tasks.map((l) => {
          return l._id === action.payload._id ? action.payload : l
        })
      }
    default:
      return state
  }
}

export const TaskContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TaskReducer, {
    tasks: [],
  })
  console.log("TaskContext state: ", state)
  return (
    <TaskContext.Provider value={{...state, dispatch}}>
      { children }
    </TaskContext.Provider>
  )
}