'use strict';
module.exports = (sequelize, DataTypes) => {
  const country = sequelize.define('country', {
    country: DataTypes.STRING,
    abbre: DataTypes.STRING,
    phone_prefix: DataTypes.STRING
  }, {});
  country.associate = function(models) {
    // associations can be defined here
  };
  return country;
};