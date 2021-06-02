'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Rentals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      rental_date: {
        type: Sequelize.DATE
      },
      inventory_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'inventories',
          key: 'id',
        }
      },
      customer_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'customers',
          key: 'id',
        }
      },
      return_date: {
        type: Sequelize.DATE
      },
      staff_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'staffs',
          key: 'id'
        }
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
    await queryInterface.dropTable('Rentals');
  }
};
