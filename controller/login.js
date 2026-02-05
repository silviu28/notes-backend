const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const express = require('express')
const { User } = require('../model')

const JWT_SECRET = process.env.JWT_SECRET

const loginRouter = express.Router()

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({
    where: { username },
  })

  const passwordIsCorrect = user
    ? await bcrypt.compare(password, user.passwordHash)
    : false

  if (!passwordIsCorrect) {
    return res.status(401).json({ error: 'Invalid username and/or password.' })
  }
  if (user.disabled) {
    return res.status(401).json({ error: "Account disabled, contact an admin for more information." })
  }

  const token = jwt.sign({
    username,
    id: user.id,
  }, JWT_SECRET, {
    expiresIn: 3600 * 24 * 31,
  })

  res.status(200).send({
    token,
    username,
  })
})

module.exports = loginRouter