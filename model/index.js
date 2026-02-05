const Blog = require('./Blog')
const Note = require('./Note')
const User = require('./User')

User.hasMany(Blog)
Blog.belongsTo(User)

// bundle all models into one export
module.exports = { Note, Blog, User }