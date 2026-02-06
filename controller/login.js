const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const express = require('express')
const { User, Session } = require('../model')

const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRATION = process.env.JWT_EXPIRATIOn

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
    expiresIn: JWT_EXPIRATION,
  })

  // add token to the sessions table
  await Session.create({
    token,
    userId: user.id,
    creationDate: new Date()
  })

  res.status(200).send({
    token,
    username,
  })
})

module.exports = loginRouter