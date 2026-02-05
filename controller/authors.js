const express = require('express')
const { Blog } = require('../model')
const { fn, col } = require('sequelize')

const authorsRouter = express.Router()

authorsRouter.get('/', async (req, res) => {
  const authors = await Blog.findAll({
    attributes: ['author',
      [fn('count', col('id')), 'blogCount'],
      [fn('sum', col('likes')), 'likes'],
    ],
    group: ['author'],
    order: [['likes', 'DESC']],
  })
  res.json(authors)
})

module.exports = authorsRouter