const { Sequelize } = require('sequelize')
const config = require('./config')
const { Umzug, SequelizeStorage } = require('umzug')

const sequelize = new Sequelize(config)

const migrationConfig = {
  migrations: {
    glob: 'migrations/*.js',
  },
  storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
  context: sequelize.getQueryInterface(),
  logger: console,
}

const runMigrations = async () => {
  const migrator = new Umzug(migrationConfig)

  const migrations = await migrator.up()
  console.log('[INFO] Migrations up to date', {
    files: migrations.map(mig => mig.name),
  })
}

const rollbackMigration = async () => {
  await sequelize.authenticate()
  const migrator = new Umzug(migrationConfig)
  await migrator.down()
}

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    await runMigrations()
    console.log('[INFO] Connected to the database')
  } catch (error) {
    console.log('[ERROR] Failed to connect to the database: ', error)
    return process.exit(1)
  }

  return null
}

module.exports = { sequelize, connectToDatabase, rollbackMigration }