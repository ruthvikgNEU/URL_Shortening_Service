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
    max_urls: {
      type: sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1000,
    },
    curr_urls: {
      type: sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  }, {
    createdAt: 'account_created',
    updatedAt: 'account_updated'
  });

  module.exports = User;