const mongoose = require('mongoose')
const Schema = mongoose.Schema
const listSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: 'Task'
    }
    ]
}, {timestamps: true})

module.exports = mongoose.model('List', listSchema)