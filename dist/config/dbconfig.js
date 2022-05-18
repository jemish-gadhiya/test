"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const path_1 = __importDefault(require("path"));
var sql = {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_USER_PWD,
    dialect: 'mysql',
    logging: true
};
var sqlWritter = Object.assign(Object.assign({}, sql), { host: process.env.DB_HOST_WRITTER, timezone: '+00:00' });
//Providing the database connection
var [dbWriter] = [{
        sequelize: new sequelize_1.Sequelize(sql.database, sql.username, sql.password, sqlWritter)
    }];
var DBInstance = [{
        'name': dbWriter
    }];
DBInstance.forEach(element => {
    element.name['users'] = require(path_1.default.join(__dirname, "../model/users"))(element.name['sequelize'], sequelize_1.Sequelize);
    element.name['blogs'] = require(path_1.default.join(__dirname, "../model/blogs"))(element.name['sequelize'], sequelize_1.Sequelize);
    Object.keys(element.name).forEach(function (modelName) {
        if ('associate' in element.name[modelName]) {
            element.name[modelName].associate(element.name);
        }
    });
});
dbWriter.Sequelize = sequelize_1.Sequelize;
module.exports = { dbWriter };
