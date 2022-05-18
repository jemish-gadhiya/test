"use strict";
'user strict';
module.exports = function (sequelize, Datatypes) {
    var blogs = sequelize.define('blogs', {
        id: {
            type: Datatypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            unique: true
        },
        author: Datatypes.INTEGER(11),
        title: Datatypes.STRING(100),
        description: Datatypes.TEXT(),
        publish_date: Datatypes.DATE(),
        modify_date: Datatypes.DATE(),
        status: Datatypes.STRING(50),
        category: Datatypes.STRING(100)
    }, {
        tableName: "blogs",
        timestamps: false,
        underscored: true
    });
    blogs.associate = function (models) {
        blogs.belongsTo(models.users, {
            foreignKey: 'author',
            tergetKey: 'id'
        });
    };
    return blogs;
};
