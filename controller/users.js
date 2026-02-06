const express = require('express')
const { User, Blog, ReadingList } = require('../model')
const tokenExtractor = require('../middleware/tokenExtractor')
const adminChecker = require('../middleware/adminChecker')

const usersRouter = express.Router()

usersRouter.get('/', async (_req, res) => {
  const users = await User.findAll({
    include: [
      {
        model: Blog,
        as: 'readings',
        through: {
          attributes: ['id', 'read'],
        },
      },
    ],
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

// admin-only operation for enabling/disabling user accounts
usersRouter.post('/:username', tokenExtractor, adminChecker, async (req, res) => {
  const { username } = req.params
  const user = await User.findOne({
    where: { username },
  })

  if (user) {
    user.disabled = req.body.disabled
    await user.save()
    res.json(user)
  } else {
    res.status(404).end()
  }
})

module.exports = usersRouter