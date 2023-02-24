import fs from "fs";
import path from "path";
import Sequelize from "sequelize";
import enVariables from "../config/db.config";

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = enVariables[env];
const db = {};

const getSequelize = () => {
  // test environment
  if (process.env.NODE_ENV === "test") {
    return new Sequelize("sqlite::memory:", "test", undefined, {
      logging: false,
      dialect: "sqlite",
    });
  }

  // using environment variables to create Sequelize instance
  if (config.use_env_variable) {
    console.log("USING ENV VARIABLE TO CREATE SEQUELIZE");
    return new Sequelize(process.env[config.use_env_variable], config);
  }

  // defaulting to config vars to create Sequelize instance
  console.log("USING CONFIG VARS TO CREATE SEQUELIZE");
  return new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
};

const sequelize = getSequelize();

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
db.Cluster = require("./cluster.model")(sequelize, Sequelize);
db.User = require("./user.model")(sequelize, Sequelize);
db.Star = require("./star.model")(sequelize, Sequelize);

db.Cluster.associate(db);
db.Star.associate(db);

module.exports = db;
