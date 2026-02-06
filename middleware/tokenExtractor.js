const jwt = require('jsonwebtoken')
const { Session, User } = require('../model')

const JWT_SECRET = process.env.JWT_SECRET

const tokenExtractor = async (req, res, next) => {
  const auth = req.get('authorization')

  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    try {
      const token = auth.substring(7)
      req.decodedToken = jwt.verify(token, JWT_SECRET)

      // check for the token in the database
      const session = await Session.findOne({
        where: { token }
      })
      if (!session)
        throw new Error()

      const user = await User.findOne({
        where: { id: req.decodedToken.id }
      })
      if (user.disabled) {
        return res.status(403).json({ error: 'This user is disabled. Contact an admin for more information.' })
      }
    } catch (_error) {
      return res.status(401).json({ error: 'Invalid auth token.', })
    }
  } else {
    return res.status(401).json({ error: 'Auth token is missing.' })
  }

  next()
}

module.exports = tokenExtractor