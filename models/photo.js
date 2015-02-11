"use strict";

module.exports = function(sequelize, DataTypes) {
    var Photo  = sequelize.define("Photo", {
        url: DataTypes.STRING,
        featured: DataTypes.STRING,
        rank: DataTypes.INTEGER
    }, {
        classMethods: {
            associate: function(models) {
                Photo.belongsTo(models.Gallery)
            }
        }
    });

    return Photo;
};
