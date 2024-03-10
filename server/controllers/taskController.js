const List = require('../models/listModel')
const Task = require('../models/taskModel')
const mongoose = require('mongoose')

const getTasks = async (req, res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ error: 'Invalid list ID'})
    }
    try{
        const tasks = await Task.find({ listId: id }).sort({createAt: -1})
        res.status(200).json(tasks)
    } catch(error){
        res.status(500).json({ error: 'Internal server Error' })
    }
}

const updateTask = async (req, res) => {

    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such task'})
    }
    try{

        const task = await Task.findById(id)
        
        if(!task){
            return res.status(400).json({error: 'No such task'})
        }

        Object.assign(task, req.body)
        await task.save()
        res.status(201).json(task)

    }catch(error){
        console.log("error: ", error)
        res.status(500).json({ error: 'Internal server error'})
    }
}

const deleteTask = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such task' })
    }

    try {
        const task = await Task.findById(id)
        
        if (!task) {
            return res.status(404).json({ error: 'No such task' })
        }

        const list = await List.findById(task.list)
        list.tasks = list.tasks.filter(t => t.toString() !== task._id.toString())
        await list.save()

        await task.deleteOne({_id: id})

        console.log('Task deleted successfully')
        return res.status(200).json(list)
    } catch (error) {
        console.error('Error deleting task:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
}


module.exports = {
    getTasks,
    updateTask,
    deleteTask
}