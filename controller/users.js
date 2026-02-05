const express = require('express')
const { User, Blog } = require('../model')

const usersRouter = express.Router()

usersRouter.get('/', async (_req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ['userId'], },
    },
  })
  res.json(users)
})

usersRouter.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id)
  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

usersRouter.post('/', async (req, res) => {
  const user = await User.create(req.body)
  res.json(user)
})

module.exports = usersRouter