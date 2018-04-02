'use strict';
module.exports = (sequelize, DataTypes) => {
  var role = sequelize.define('role', {}, {});
  role.associate = function(models) {
    // associations can be defined here
  };
  return role;
};