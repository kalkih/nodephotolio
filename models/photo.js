"use strict";

module.exports = function(sequelize, DataTypes) {
    var Photo  = sequelize.define("Photo", {
        year: DataTypes.INTEGER,
        month: DataTypes.STRING,
        country: DataTypes.STRING,
        city: DataTypes.STRING,
        url: DataTypes.STRING,
        thumb: DataTypes.STRING,
        featured: DataTypes.STRING
    });

    return Photo;
};
