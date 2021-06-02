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
      Store.hasMany(models.Staff, { as: 'store', foreignKey: { name: 'store_id' } });
      Store.belongsTo(models.Staff, {as:'manager_staff',  foreignKey: 'manager_staff_id'  });
      Store.belongsTo(models.Address, { as: 'address', foreignKey: { name: 'address_id' } });
      Store.belongsToMany(models.Film, {
        through: models.Inventory,
       
        foreignKey: 'store_id',
       
      })
    }
  };
  Store.init({
  }, {
    sequelize,
    modelName: 'Store',
  });
  return Store;
};