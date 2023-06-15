import fs from "fs";
import Sequelize from "sequelize";
import path, { dirname } from "path";
import config from "../config/config.js";
import { fileURLToPath } from "url";

const dbConfig = config.database.mysql;
const db = {};
const sequelize = new Sequelize(dbConfig.database,dbConfig.user,dbConfig.password,{
    host : dbConfig.host,
    port : dbConfig.port,
    timezone :  dbConfig.timezone,
    dialect : "mysql"
});

fs.readdirSync(__dirname).filter((file)=>file.indexOf(".")!==0 && file !=="index.js").forEach((file)=>{
    console.log("File : "+file);
    const model = require(path.join(__dirname, file))(sequelize,Sequelize.DataTypes);
    db[model.name] = model;
});


db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports =  db;