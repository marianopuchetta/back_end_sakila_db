'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Inventory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Inventory.belongsTo(models.Store,{as:'store',foreignKey:'store_id'});
      Inventory.belongsTo(models.Film,{as:'film',foreignKey:'film_id'});
    }
  };
  Inventory.init({
   
  }, {
    sequelize,
    modelName: 'Inventory',
  });
  return Inventory;
};