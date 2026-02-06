const express = require('express')
const { User, Blog, ReadingList, Session } = require('../model')
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
  let whereClause = {}
  if (req.query.read) {
    whereClause = {
      read: req.query.read === 'true',
    }
  }

  const user = await User.findByPk(req.params.id, {
    include: [
      {
        model: Blog,
        as: 'readings',
        through: {
          attributes: ['id', 'read'],
          where: whereClause,
        },
      },
    ]
  })
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

    // also revoke all previous sessions
    await Session.destroy({
      where: { userId: user.id }
    })
    res.json(user)
  } else {
    res.status(404).end()
  }
})

module.exports = usersRouter

