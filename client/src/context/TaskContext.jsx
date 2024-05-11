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
        tasks: state.tasks.map((t) => {
          return t._id === action.payload._id ? action.payload : t
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
  return (
    <TaskContext.Provider value={{...state, dispatch}}>
      { children }
    </TaskContext.Provider>
  )
}