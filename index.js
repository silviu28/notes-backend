require('dotenv').config({ quiet: true })
const express = require('express')
const notesRouter = require('./controller/notes')
const blogsRouter = require('./controller/blogs')

const app = express()

app.use('/api/notes', notesRouter)
app.use('/api/blogs', blogsRouter)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})