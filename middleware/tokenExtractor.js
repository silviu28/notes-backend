const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET

const tokenExtractor = (req, res, next) => {
  const auth = req.get('authorization')

  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
    } catch (_error) {
      return res.status(401).json({ error: "Invalid auth token.", })
    }
  } else {
    return res.status(401).json({ error: "Auth token is missing." })
  }

  next()
}

module.exports = tokenExtractor