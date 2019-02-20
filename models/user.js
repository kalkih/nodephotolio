'use strict';

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING(64)
        },
        password: DataTypes.STRING(64)
    });

    return User;
};
