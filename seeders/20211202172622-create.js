'use strict';
const faker = require('faker/locale/es');
const db = require('../models')


module.exports = {
  up: async (queryInterface, Sequelize) => {

  
    const addFilmCategories = async () => {
      for (let index = 1; index < 1002; index++) {
          const categoryId = Math.floor((Math.random() *  (16+1 -1)) +1);
          const film_categories = [...Array(1)].map((film_categories) => (
            {
              film_id: index,
              category_id: categoryId,
              createdAt: new Date(),
              updatedAt: new Date()
            }
          ))
      
          await queryInterface.bulkInsert('film_categories', film_categories, {});
       
      }
    }


    addFilmCategories()
   
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};