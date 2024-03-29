import { createContext, useReducer } from 'react'

export const ListContext = createContext()

export const ListReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LISTS': 
      return {
        lists: action.payload
      }
    case 'CREATE_LIST':
      return {
        lists: [action.payload, ...state.lists]
      }
    case 'DELETE_LIST':
      return {
        lists: state.lists.filter((l) => l._id !== action.payload._id)
      }
    case 'UPDATE_LIST': 
    return {
        lists: state.lists.map((l) => {
          return l._id === action.payload._id ? action.payload : l
        })
      }
    default:
      return state
  }
}

export const ListContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ListReducer, {
    lists: [],
  })
  console.log("ListContext state: ", state)
  return (
    <ListContext.Provider value={{...state, dispatch}}>
      { children }
    </ListContext.Provider>
  )
}