const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('reading_lists', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: 'users',
          key: 'id',
        },
        allowNull: false,
      },
      blog_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: 'blogs',
          key: 'id',
        },
        allowNull: false,
      },
      read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      }
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('reading_lists')
  }
}