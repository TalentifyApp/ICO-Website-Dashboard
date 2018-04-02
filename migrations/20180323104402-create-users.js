'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstname: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
          unique:true
      },
      lastname: {
        type: Sequelize.STRING
      },
      middle: {
        type: Sequelize.STRING
      },
      DOB: {
        type: Sequelize.DATE
      },
      country: {
        type: Sequelize.INTEGER
      },
      address: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.INTEGER,
          defaultValue:true
      },
      city: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.INTEGER
      },
      phone: {
        type: Sequelize.INTEGER,
          unique:true
      },
      password: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};