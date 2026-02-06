const { Model, DataTypes } = require("sequelize");
const { sequelize } = require('../util/db')

class Session extends Model { }

Session.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  creationDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id',
    },
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'session',
})

module.exports = Session