require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')


const app = express()

app.use(express.json())
app.use(cors)
app.use((req, res, next) => {
    next()
})

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('connected')
    app.listen(process.env.PORT, () => {
        console.log('listening on port', process.env.PORT)
    })
}).catch((err) => {
    console.log(err)
})

