require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose")
const cors = require('cors')
const app = express();
const listRoutes = require('./routes/lists')
const userRoutes = require('./routes/user')
const taskRoutes = require('./routes/tasks')

app.use(express.json());
app.use(cors())


app.use((req, res, next) => {
    next()
})

app.use('/api/lists', listRoutes)
app.use('/api/user', userRoutes)
app.use('/api/tasks', taskRoutes)

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('connected')
    app.listen(process.env.PORT, () => {
        console.log("listening on port", process.env.PORT)
    })
}).catch((err) => {
    console.log(err)
})

