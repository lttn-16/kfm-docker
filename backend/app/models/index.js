const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port: dbConfig.port,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model.js")(sequelize, Sequelize);
const initializeDatabase = async () => {
  try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
      await sequelize.sync();  // This will create the table if it does not exist
      console.log('Database synchronized.');
  } catch (error) {
      console.error('Unable to connect to the database:', error);
  }
};
initializeDatabase();

module.exports = db;
