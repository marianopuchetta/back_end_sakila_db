'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rental extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Rental.belongsTo(models.Inventory, {as:'inventory', foreignKey: { name: 'inventory_id' } })
      Rental.belongsTo(models.Customer, { as:'customer',foreignKey: { name: 'customer_id' } });
      Rental.belongsTo(models.Staff, { foreignKey: { name: 'staff_id' } });
    }
  };
  Rental.init({
    rental_date: DataTypes.DATE,
    return_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Rental',
  });
  return Rental;
};