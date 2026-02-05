const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'SequelizeValidationError') {
    return res.status(400).json({
      error: 'Validation error',
      details: error.errors.map(e => e.message)
    });
  }

  if (error.name === 'SequelizeDatabaseError') {
    return res.status(400).json({
      error: 'Database error',
      details: error.message
    });
  }

  res.status(500)
    .json({ error: 'Internal server error' });

  next()
}

module.exports = errorHandler