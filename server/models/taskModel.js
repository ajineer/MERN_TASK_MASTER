const mongoose = require('mongoose')
const {Schema} = require('mongoose')

const taskSchema = new Schema({
    name: {
        type: String,
        required: true

    },
    status: {
        type: Boolean,
        required: true
    },
    list: {
        type: Schema.Types.ObjectId,
        ref: 'List'
    }
},
{timestamps: true})

module.exports = mongoose.model('Task', taskSchema)