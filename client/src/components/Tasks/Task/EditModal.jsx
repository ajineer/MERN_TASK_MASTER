import './EditModal.css'

const EditModal = ({taskDate, handleEdit, setEdit, editTaskForm, setEditTaskForm}) => {
  return (
    <form 
        className="edit-task"
        onSubmit={(e) => handleEdit(e)}
      > 
        <input
        className="placeholder-edit"
        placeholder={editTaskForm.name}
        maxLength={20}
        required
        onChange={(e) => setEditTaskForm({...editTaskForm, name: e.target.value})}
        onKeyDown={(e) => e.key === "Escape" && setEdit(false)}
        />
        <input
            className='modal-submit'
            type='submit'
            value='+'
        />
      </form>
  )
}

export default EditModal