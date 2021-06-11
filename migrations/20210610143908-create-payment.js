'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Payments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customer_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'customers',
          key: 'id',
          as:'customer_payment'
        }
      },
       staff_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'staffs',
          key: 'id',
          as:'staff_payment'
        }
      },
      rental_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'rentals',
          key: 'id',
          as:'rental_payment'
        }
      },
      amount: {
        type: Sequelize.DECIMAL(5, 2)
      },
      payment_date: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('Payments');
  }
};
