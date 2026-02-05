const express = require('express')
const { User } = require('../model')

const userRouter = express.Router()

userRouter.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id)
  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

userRouter.post('/', async (req, res) => {
  const user = await User.create(req.body)
  res.json(user)
})

module.exports = userRouter