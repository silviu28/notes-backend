const { DataTypes } = require("sequelize")
const { isRecent } = require("../validation")

module.exports = {
  up: async ({ context: queryInterface }) => {
    queryInterface.addColumn('blogs', 'year', {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isRecent
      },
    })
  },
  down: async ({ context: queryInterface }) => {
    queryInterface.removeColumn('blogs', 'year')
  },
}