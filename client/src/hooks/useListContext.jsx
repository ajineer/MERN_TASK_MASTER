import { ListContext } from "../context/ListContext.jsx";
import { useContext } from "react";

export const useListContext = () => {
    const context = useContext(ListContext)

    if(!context){
        throw Error('useListContext must be used inside ListContextProvider')
    }

    return context
}
