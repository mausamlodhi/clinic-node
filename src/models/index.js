import fs from 'fs';
import Sequelize from 'sequelize';
import path from 'path';
import config from '../config';

const dbConfig = config.database.mysql;

const db = {};
const sequelize = new Sequelize(dbConfig.db, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  port: dbConfig.port,
  dialect: 'mysql',
});


fs.readdirSync(__dirname)
  .filter((file) => file.indexOf('.') !== 0 && file !== 'index.js')
  .forEach((file) => {
    // eslint-disable-next-line import/no-dynamic-require, global-require
    console.log(file);
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes,
    );
    db[model.name] = model;
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;