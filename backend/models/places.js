'use strict';
module.exports = (sequelize, DataTypes) => {
  var places = sequelize.define('places', {
    place: DataTypes.STRING,
    country: DataTypes.INTEGER
  }, {});
  places.associate = function(models) {
    // associations can be defined here
  };
  return places;
};