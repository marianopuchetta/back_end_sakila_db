'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Customers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      store_id:{
        type: Sequelize.INTEGER,
        references: {
          model: 'stores',
          key: 'id',
          as:'store'
        }
      },
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      address_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'addresses',
          key: 'id',
          as:'address'
        }
      },
      active: {
        type: Sequelize.TINYINT,
        defaultValue: true
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
    await queryInterface.dropTable('Customers');
  }
};

