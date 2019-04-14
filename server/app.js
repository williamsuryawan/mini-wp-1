require('dotenv').config()
const express = require('express')
const cors = require ('cors')
const mongoose = require ('mongoose')

// const indexRouter = require('./routes/index')
const userRouter = require('./routes/users')
const articleRouter = require('./routes/articles')
const tagRouter = require('./routes/tags')
const port = process.env.port || 3000

const app = express()
app.use(cors())
mongoose.connect(`mongodb+srv://${process.env.name}:${process.env.password}@cluster0-dlbfv.mongodb.net/miniwpr?retryWrites=true`, {useNewUrlParser: true})

app.use(express.json())
app.use(express.urlencoded({extended: false}))

// app.use('/', indexRouter)
app.use('/users', userRouter)
app.use('/articles', articleRouter)
app.use('/tags', tagRouter)

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})

module.exports = app;