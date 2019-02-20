"use strict";

module.exports = function(sequelize, DataTypes) {
    var Photo  = sequelize.define("Photo", {
        url: DataTypes.STRING,
        featured: DataTypes.STRING,
        rank: DataTypes.INTEGER
    });
    Photo.associate = function(models) {
        models.Photo.belongsTo(models.Gallery);
    };

    return Photo;
};
