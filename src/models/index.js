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
  logging:false
});


fs.readdirSync(__dirname)
  .filter((file) => file.indexOf('.') !== 0 && file !== 'index.js')
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes,
    );
    db[model.name] = model;
  });
  Object.keys(db).forEach((modelName)=>{
    if(db[modelName].associate)
      db[modelName].associate(db);
  })

  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
    if (db[modelName].seedData) {
      db[modelName].seedData(config);
    }
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
