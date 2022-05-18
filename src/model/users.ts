'user strict';
module.exports = function(sequelize: any, Datatypes: any) {

    var users: any = sequelize.define('users',{
        id: {
            type: Datatypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            unique: true
        },
        firstname: Datatypes.STRING(50),
        lastname: Datatypes.STRING(50),
        email: Datatypes.STRING(50),
        password: Datatypes.STRING(200),
        dob: Datatypes.DATE(),
        role: Datatypes.STRING(50),
    },
    {
        tableName: "users",
        timestamps: false,
        underscored: true
    });


    users.associate = function (models: any) {
        users.hasMany(models.blogs, {
            foreignKey: 'id',
            tergetKey: 'author'
        });
    };

    return users;
};