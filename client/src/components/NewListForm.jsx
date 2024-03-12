import { Button, TextField } from "@mui/material"
import { useState } from "react"
import { postListReq } from "../routes/listRoutes"
import { useAuthContext } from "../hooks/useAuthContext"
import { useListContext } from "../hooks/useListContext"

const NewListForm = ({setIndex}) => {

    const {user} = useAuthContext()
    const { dispatch } = useListContext()
    const [error, setError] = useState('')
    const [listForm, setListForm] = useState({
        title: ''
    })

    const handleSubmit = async (e) => {
        
        e.preventDefault()
        
        if(!user){
            setError("Must be logged in")
            return 
        }
        const response = await postListReq(e, user, listForm)
        const json = await response.json()
        if(!response.ok){
            setError(json.error)
        }
        if(response.ok){
            dispatch({type: 'CREATE_LIST', payload: json})
            setListForm({title: ''})
            setIndex(lists.indexOf(json))
        }
    }
    
    return (
        <form style={{display: 'flex', alignItems: 'center', padding: '0'}} onSubmit={(e) => handleSubmit(e)}>
            <input onChange={(e) => setListForm({title: e.target.value})} type="text" maxLength={16} value={listForm.title} placeholder="Enter list"/>
            <button sx={{border: '2px solid black'}} type="submit">+</button>
        </form>
    )
}

export default NewListForm