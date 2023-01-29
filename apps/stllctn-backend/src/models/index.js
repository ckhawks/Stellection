import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import enVariables from '../config/db.config';

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = enVariables[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
    console.log("USING ENV VARIABLE TO CREATE SEQUELIZE");
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    console.log("USING CONFIG VARS TO CREATE SEQUELIZE");
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// const dbConfig = require("../config/db.config.js");

// const Sequelize = require("sequelize");
// const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
//   host: dbConfig.HOST,
//   dialect: dbConfig.dialect,
//   operatorsAliases: false,

//   pool: {
//     max: dbConfig.pool.max,
//     min: dbConfig.pool.min,
//     acquire: dbConfig.pool.acquire,
//     idle: dbConfig.pool.idle
//   }
// });

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);

module.exports = db;