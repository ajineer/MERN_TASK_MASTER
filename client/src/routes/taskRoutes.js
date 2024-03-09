export const deleteTaskReq = async (task, user) => {

    const response = await fetch(`http://localhost:5555/api/tasks/${task._id}`,{
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${user.token}`
        }
    })

    return response
}

export const patchTaskReq = async (e, task, user) => {

    const response = await fetch(`http://localhost:5555/api/tasks/${task._id}`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: e.target.name.value,
            status: e.target.checked
        })
    })

    return response
}

export const postTaskReq = async (taskForm, user) => {
    const response = await fetch('http://localhost:5555/api/tasks', {
        method: 'POST',
        headers: {
            'Authorization': `Berer ${user.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskForm)
    })
    return response
}