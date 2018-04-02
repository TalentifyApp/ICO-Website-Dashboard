'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    middle: DataTypes.STRING,
    DOB: DataTypes.DATE,
      status:DataTypes.INTEGER,
    country: DataTypes.INTEGER,
    address: DataTypes.STRING,
      email:DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.INTEGER,
    phone: DataTypes.INTEGER,
    password: DataTypes.STRING,
    role: DataTypes.INTEGER
  }, {});
  users.associate = function(models) {
    // associations can be defined here
  };
  return users;
};