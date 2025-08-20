const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: "postgres", // <- aquí debe ser 'postgres'
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
  },
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.clients = require("./clients.models.js")(sequelize, Sequelize);
db.vehicles = require("./vehicles.models.js")(sequelize, Sequelize);
db.rentals = require("./rentals.models.js")(sequelize, Sequelize);

module.exports = db;
