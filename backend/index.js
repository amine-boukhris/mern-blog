require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT
const db = require('./src/config/db')
const cors = require('cors')

app.use(cors())
app.use(express.json())

const usersRouter = require('./src/routes/users.route')
const postsRouter = require('./src/routes/posts.route')

app.use('/api/users', usersRouter)
app.use('/api/posts', postsRouter)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
