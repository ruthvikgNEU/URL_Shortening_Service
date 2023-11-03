const sequelize = require("sequelize");

const db = require(__dirname + "/../services/service.js");

const User = db.define('User', {
    id: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: sequelize.STRING,
      allowNull: false,
    },
    last_name: {
      type: sequelize.STRING,
      allowNull: false,
    },
    username: {
      type: sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: sequelize.STRING,
      allowNull: false,
    },
  }, {
    createdAt: 'account_created',
    updatedAt: 'account_updated'
  });

  module.exports = User;