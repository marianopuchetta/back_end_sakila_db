'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Payment.belongsTo(models.Customer,{as:'customer',foreignKey:'customer_id'});
      Payment.belongsTo(models.Staff,{as:'staff',foreignKey:'staff_id'});
      Payment.belongsTo(models.Rental,{as:'rental',foreignKey:'rental_id'});
    }
  };
  Payment.init({
    amount: DataTypes.DECIMAL(5, 2),
    payment_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Payment',
  });
  return Payment;
};