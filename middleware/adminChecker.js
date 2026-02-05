const { User } = require("../model")

const adminChecker = async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken.id)
  if (!user.admin) {
    return res.status(401).json({ error: "Unauthorized operation." })
  }

  next()
}

module.exports = adminChecker