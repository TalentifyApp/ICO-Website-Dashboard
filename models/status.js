'use strict';
module.exports = (sequelize, DataTypes) => {
  var status = sequelize.define('status', {}, {});
  status.associate = function(models) {
    // associations can be defined here
  };
  return status;
};