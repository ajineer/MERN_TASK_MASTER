import { ListsContext } from "../context/ListContext";
import { useContext } from "react";

export const useListsContext = () => {
    const context = useContext(ListsContext)

    if(!context){
        throw Error('useListsContext must be used inside ListsContextProvider')
    }

    return context
}
