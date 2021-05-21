'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Film_actors', {
      film_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'films',
          key: 'id'
        }
      } ,
      actor_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'actors',
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
    await queryInterface.dropTable('Film_actors');
  }
};

