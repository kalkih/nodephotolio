"use strict";

module.exports = function(sequelize, DataTypes) {
    var Gallery = sequelize.define("Gallery", {
        name: DataTypes.STRING,
        year: DataTypes.INTEGER,
        month: DataTypes.STRING
    });
    Gallery.associate = function(models) {
        models.Gallery.hasMany(models.Photo);
    };
    return Gallery;
};
