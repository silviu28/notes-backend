require('dotenv').config({ quiet: true })
const express = require('express')
const notesRouter = require('./controller/notes')
const blogsRouter = require('./controller/blogs')
const errorHandler = require('./middleware/errorHandler')
const userRouter = require('./controller/users')
const registerRouter = require('./controller/register')
const loginRouter = require('./controller/login')

const app = express()
app.use(express.json())

app.use('/api/notes', notesRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', userRouter)
app.use('/api/register', registerRouter)
app.use('/api/login', loginRouter)
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})