require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT
const db = require('./src/config/db')
app.use(bodyParser.json())

const usersRouter = require('./src/routes/users.route')
const blogsRouter = require('./src/routes/blogs.routes')

app.use('/api/users', usersRouter)
app.use('/api/blogs', blogsRouter)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
