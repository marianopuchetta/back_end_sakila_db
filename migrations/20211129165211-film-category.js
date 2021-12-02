'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Film_categories',{
      film_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        reference:{
          model: 'films',
          key:'id'
        }
      },
      category_id:{
        type: Sequelize.INTEGER,
        primaryKey:true,
        references:{
          model:'categories',
          key: 'id'
        }
      },
      createdAt:{
        allowNull:false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull : false,
        type: Sequelize.DATE
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Film_categories')
  }
};
