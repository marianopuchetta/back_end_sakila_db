'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Addresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      address: {
        type: Sequelize.STRING
      },
      address2: {
        type: Sequelize.STRING
      },
      district: {
        type: Sequelize.STRING
      },
      city_id: {
        type: Sequelize.INTEGER,
        },
      postal_code: { 
        type: Sequelize.STRING 
      },
      phone: {
         type: Sequelize.STRING
         },
      location: {
         type: Sequelize.GEOMETRY
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Addresses');
  }
};
