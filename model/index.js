const Blog = require('./Blog')
const Note = require('./Note')
const ReadingList = require('./ReadingList')
const Session = require('./Session')
const User = require('./User')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, {
  through: ReadingList,
  as: 'readings',
})
Blog.belongsToMany(User, {
  through: ReadingList,
  as: 'readers',
})

User.hasMany(ReadingList)
ReadingList.belongsTo(User)

Blog.hasMany(ReadingList)
ReadingList.belongsTo(Blog)

User.hasMany(Session)
Session.belongsTo(User)

// bundle all models into one export
module.exports = {
  Note,
  Blog,
  User,
  ReadingList,
  Session,
}