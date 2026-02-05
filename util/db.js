const { Sequelize } = require('sequelize')
const config = require('./config')

const sequelize = new Sequelize(config)

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log('[INFO] Connected to the database')
  } catch (error) {
    console.log('[ERROR] Failed to connect to the database: ', error)
    return process.exit(1)
  }

  return null
}

module.exports = { sequelize, connectToDatabase }