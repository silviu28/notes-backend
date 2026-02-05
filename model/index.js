const Blog = require('./Blog')
const Note = require('./Note')
const ReadingList = require('./readingList')
const User = require('./User')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: ReadingList, as: 'userId' })
Blog.belongsToMany(User, { through: ReadingList, as: 'blogId' })

// bundle all models into one export
module.exports = { Note, Blog, User, ReadingList }