"use strict";

module.exports = function(sequelize, DataTypes) {
    var Gallery = sequelize.define("Gallery", {
    name: DataTypes.STRING,
    year: DataTypes.INTEGER,
    month: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                Gallery.hasMany(models.Photo)
            }
        }
    });
    return Gallery;
};
