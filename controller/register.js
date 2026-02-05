const express = require('express')
const bcrypt = require('bcrypt')
const { User } = require('../model')

const registerRouter = express.Router()

registerRouter.post('/', async (req, res) => {
  const { name, username, password } = req.body

  const user = await User.findOne({
    where: { username },
  })

  if (user) {
    return res.status(409).json({
      error: 'User with given username already exists.',
    })
  }

  if (password.length < 6) {
    return res.status(400).json({
      error: 'Password is too short.',
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const newUser = await User.create({ name, username, passwordHash })
  res.status(200).json({
    id: newUser.id,
    name,
    username,
  })
})

module.exports = registerRouter