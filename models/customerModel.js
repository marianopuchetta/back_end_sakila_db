'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.belongsTo(models.Address,{foreignKey:'address_id'});
      Customer.hasOne(models.Rental,{foreignKey:'customer_id'})
    }
  };
  Customer.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.TEXT,
    email:DataTypes.STRING,
    active:DataTypes.TINYINT
  }, {
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};