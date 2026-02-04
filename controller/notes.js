const express = require('express')
const Note = require('../model/Note')

const notesRouter = express.Router()

notesRouter.get('/', async (_req, res) => {
  const notes = await Note.findAll()
  res.json(notes)
})

module.exports = notesRouter