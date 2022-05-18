import { Sequelize } from "sequelize";
import path from 'path';

var sql:any = {
    database: process.env.DB_NAME, 
    username: process.env.DB_USER,
    password: process.env.DB_USER_PWD,
    dialect: 'mysql',
    logging: true
};

var sqlWritter: any = {
    ...sql,
    host: process.env.DB_HOST_WRITTER,
    timezone: '+00:00'
};

//Providing the database connection
var [dbWriter]: any = [{
    sequelize: new Sequelize(
        sql.database,
        sql.username,
        sql.password,
        sqlWritter
    )
}];

var DBInstance = [{
    'name': dbWriter
}]

DBInstance.forEach(element => {
    element.name['users'] = require(path.join(__dirname,"../model/users"))(element.name['sequelize'], Sequelize);
    element.name['blogs'] = require(path.join(__dirname,"../model/blogs"))(element.name['sequelize'], Sequelize);

    Object.keys(element.name).forEach(function (modelName) {
        if('associate' in element.name[modelName]) {
            element.name[modelName].associate(element.name);
        }
    });
});

dbWriter.Sequelize = Sequelize;

module.exports = {dbWriter};
