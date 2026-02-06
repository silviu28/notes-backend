const express = require('express')
const tokenExtractor = require('../middleware/tokenExtractor')
const { Session } = require('../model')

const logoutRouter = express.Router()

// removes all sessions
logoutRouter.delete('/', tokenExtractor, async (req, res) => {
  const { id: userId } = req.decodedToken
  await Session.destroy({
    where: { userId }
  })
  res.status(200).end()
})

module.exports = logoutRouter