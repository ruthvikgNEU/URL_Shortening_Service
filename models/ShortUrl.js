const sequelize = require("sequelize");

const db = require(__dirname + "/../services/service.js");

const ShortUrl = db.define('ShortUrl', {
    id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    user_id: {
      type: sequelize.INTEGER,
      allowNull: false,
    },
    longUrl: {
      type: sequelize.STRING,
      allowNull: false,
    },
    shortUrl: {
      type: sequelize.STRING,
      allowNull: false,
    },
  }, {
    createdAt: 'check_created',
    updatedAt: 'check_updated'
  });

module.exports = ShortUrl;