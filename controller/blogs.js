const express = require('express')
const Blog = require('../model/Blogs')

const blogsRouter = express.Router()

blogsRouter.get('/', async (_req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

module.exports = blogsRouter