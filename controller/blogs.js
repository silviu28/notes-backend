const express = require('express')
const { Blog, User } = require('../model')
const tokenExtractor = require('../middleware/tokenExtractor')
const { Op } = require('sequelize')

const blogsRouter = express.Router()

blogsRouter.get('/', async (req, res) => {
  let whereClause = {}
  if (req.query.search) {
    whereClause = {
      [Op.or]: {
        title: {
          [Op.like]: `%${req.query.search}%`,
        },
        author: {
          [Op.like]: `%${req.query.search}%`,
        },
      },
    }
  }

  const blogs = await Blog.findAll({
    include: {
      model: User,
      attributes: { exclude: ['blogId'], },
    },
    where: whereClause,
    order: [['likes', 'DESC']],
  })
  res.json(blogs)
})

blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id)
  if (blog) {
    res.send(blog)
  } else {
    res.status(404).end()
  }
})

blogsRouter.post('/', tokenExtractor, async (req, res) => {
  const { id } = req.decodedToken
  const blog = await Blog.create({
    ...req.body,
    userId: id,
  })
  res.json(blog)
})

blogsRouter.delete('/:id', tokenExtractor, async (req, res) => {
  const blog = await Blog.findByPk(req.params.id)
  if (blog) {
    // middleware provides a decoded token in the request
    const { id } = req.decodedToken
    if (blog.id !== id) {
      return res.status(403).json({ error: 'You do not own this blog post' })
    }
    await blog.destroy()
  }
  res.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
  const { likes } = req.body
  const blog = await Blog.findByPk(req.params.id)

  blog.likes = likes
  await blog.save()
  res.status(200).end()
})

module.exports = blogsRouter