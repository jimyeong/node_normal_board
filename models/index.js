'use strict';
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};
const User = require("./user");
const Comment = require("./comment");




// let sequelize;
if (config.use_env_variable) {
  // sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  // sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;

db.User = User;
db.Comment = Comment;

User.init(sequelize);
Comment.init(sequelize);

User.associate(db);
Comment.associate(db);

module.exports = db;
