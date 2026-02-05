const express = require('express')
const Blog = require('../model/Blog')

const blogsRouter = express.Router()

blogsRouter.get('/', async (_req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  const blog = await Blog.create(req.body)
  res.json(blog)
})

blogsRouter.delete('/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id)

  if (!blog) {
    return res.status(404)
  }

  await blog.destroy()
  res.status(200).send()
})

module.exports = blogsRouter