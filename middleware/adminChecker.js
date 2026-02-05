const { User } = require("../model")

// !!!! this middleware DEPENDS on tokenExtractor to retrieve the user id.
// !!!! make sure to chain it BEFORE this one.
const adminChecker = async (req, res, next) => {
  if (!req.decodedToken)
    throw Error('Admin check requires the decoded token data.')

  const user = await User.findByPk(req.decodedToken.id)
  if (!user.admin) {
    return res.status(401).json({ error: "Unauthorized operation." })
  }

  next()
}

module.exports = adminChecker