const express = require('express')
const {
    getLists,
    getList,
    createList,
    createTask,
    deleteList,
    updateList
} = require('../controllers/listController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require Auth for all list routes
router.use(requireAuth)

router.get('/', getLists)
router.get('/:id', getList)
router.post('/', createList)
router.post('/:id', createTask)
router.delete('/:id', deleteList)
router.patch('/:id', updateList)

module.exports = router