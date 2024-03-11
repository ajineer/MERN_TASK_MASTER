import { Button } from "@mui/material"
import { useListContext } from "../hooks/useListContext"
import { deleteListReq } from "../routes/listRoutes"

const DeleteBtn = ({setEdit, list, user}) => {

    const{dispatch} = useListContext()

    const handleClick = async (e) => {
        e.preventDefault()
        const response = await deleteListReq(list, user)
        const json = await response.json()
        if(response.ok){
            dispatch({type: 'DELETE_LIST', payload: json})
            setEdit(false)
        }else{
            console.log(json.error)
        }
    }

    return (
        <Button onClick={(e) => handleClick(e)}>X</Button>
    )
}

export default DeleteBtn