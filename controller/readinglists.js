const express = require('express')
const tokenExtractor = require('../middleware/tokenExtractor')
const { Blog, User, ReadingList } = require('../model')

const readinglistsRouter = express.Router()

readinglistsRouter.post('/', tokenExtractor, async (req, res) => {
  const { id: blogId } = req.body
  const { id: userId } = req.decodedToken

  const blog = await Blog.findByPk(blogId)
  if (!blog) {
    return res.status(400).json({ error: 'This blog does not exist.' })
  }

  const user = await User.findByPk(userId)
  if (!user) {
    return res.status(404).json({ error: 'This user does not exist.' })
  } else if (user.disabled) {
    return res.status(401).json({ error: 'This user is disabled. Contact an admin.' })
  }

  const readingListEntry = await ReadingList.create({ userId, blogId })
  await readingListEntry.save()
  res.send(readingListEntry)
})

// change state of a reading list entry with a given id
readinglistsRouter.put('/:id', tokenExtractor, async (req, res) => {
  const { read } = req.body
  const { id: userId } = req.decodedToken

  const readingListEntry = await ReadingList.findOne({
    where: { id: req.params.id },
  })

  if (!readingListEntry) {
    return res.status(404).json({ error: 'This reading list entry does not exist.' })
  } else if (readingListEntry.userId !== userId) {
    return res.status(403).json({ error: 'This reading list entry does not belong to current user.' })
  }

  readingListEntry.read = read
  await readingListEntry.save()
  res.send(readingListEntry)
})

module.exports = readinglistsRouter