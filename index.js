require('dotenv').config({ quiet: true })
const express = require('express')
const notesRouter = require('./controller/notes')
const blogsRouter = require('./controller/blogs')
const errorHandler = require('./middleware/errorHandler')
const usersRouter = require('./controller/users')
const registerRouter = require('./controller/register')
const loginRouter = require('./controller/login')
const authorsRouter = require('./controller/authors')
const { connectToDatabase } = require('./util/db')

const app = express()
app.use(express.json())

app.use('/api/notes', notesRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/register', registerRouter)
app.use('/api/login', loginRouter)
app.use('/api/authors', authorsRouter)
app.use(errorHandler)

const PORT = process.env.PORT || 3001
const start = async () => {
  await connectToDatabase()

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()