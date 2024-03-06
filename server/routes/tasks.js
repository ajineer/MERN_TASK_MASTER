const express = require('express')
const {
    getTasks,
    deleteTask,
    updateTask
} = require('../controllers/taskController')

const router = express.Router()

router.get('/:id', getTasks)
router.patch('/:id', updateTask)
router.delete('/:id', deleteTask)

module.exports = router