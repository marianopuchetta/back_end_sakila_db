'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Store.hasMany(models.Staff);
      Store.belongsTo(models.Address, { as: 'address', foreignKey: {name: 'address_id' }});

    }
  };
  Store.init({
  }, {
    sequelize,
    modelName: 'Store',
  });
  return Store;
};