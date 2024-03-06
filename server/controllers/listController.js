const List = require('../models/listModel')
const Task = require('../models/taskModel')
const mongoose = require("mongoose")

const getLists = async (req, res) => {

    const user_id = req.user._id
    const lists = await List.find({ user_id }).sort({createdAt: -1}).populate('tasks')
    res.status(200).json(lists)
}

const getList = async (req, res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such list'})
    }

    const list = await List.findById(id).populate('tasks')

    if (!List) {
        return res.status(404).json({error: 'No such list'})
    }

    res.status(200).json(list)
}

const createList = async (req, res) => {
    const {title} = req.body

    try {
        const user_id = req.user._id
        const list = await List.create({title, user_id})
        res.status(200).json(list)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const createTask = async (req, res) => {

    try{
        const { id } = req.params
        const { name } = req.body
        const list = await List.findById(id)
        if(!list){
            return res.status(404).json({error: 'List not found'})
        }
        const task = new Task({name: name, status: false, list: list._id})
        await task.save()
        list.tasks.push(task._id)
        await list.save()
        res.status(201).json(task)
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
}

const deleteList = async (req, res) => {

    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such list'})
    }
    
    try{
        const list = await List.findById(id)
        
        if(!list) {
            return res.status(400).json({error: 'No such list'})
        }
        
        await Task.deleteMany({ _id: {$in: list.tasks}})
        await List.findByIdAndDelete(id)
        
        res.status(200).json(list)

    }catch (error){
        res.status(500).json({error: 'Failed to delete list'})
    }

}

const updateList = async (req, res) => {

    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such list'})
    }
    try{
        const list = await List.findOne({_id: id})

        if(!list){
            return res.status(400).json({error: 'No such list'})
        }

        Object.assign(list, req.body)
        await list.save()
        res.status(201).json(list)
    }catch(error){
        console.log('error', error)
        res.status(500).json({error: 'Internal server error'})
    }
}


module.exports = {
    getLists,
    getList,
    createList,
    deleteList,
    updateList,
    createTask
}