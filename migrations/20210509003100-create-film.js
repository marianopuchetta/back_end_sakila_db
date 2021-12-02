'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Films', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      release_year: {
        type: Sequelize.STRING
      },
      language_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'languages',
          as:'language',
          key: 'id'
        }
      },
      original_language_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'languages',
          as: 'original_language',
          key: 'id'
        }
      },
      rental_duration: { type: Sequelize.STRING },
      rental_rate: { type: Sequelize.DECIMAL(4, 2) },
      length: { type: Sequelize.INTEGER },
      replacement_cost: { type: Sequelize.DECIMAL(5, 2) },
      rating: {
        type: Sequelize.ENUM,
        values: ['G', 'PG', 'PG-13', 'R', 'NC-17']
      },
      special_features: {
        type: Sequelize.ENUM,
        values: ['Trailers', 'Commentaries', 'Deleted Scenes', 'Behind the Scenes']
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
    await queryInterface.dropTable('Films');
  }
};
