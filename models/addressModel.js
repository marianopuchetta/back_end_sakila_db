'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Address.hasOne(models.Customer,{foreignKey:'address_id'})
    }
  };
  Address.init({
    address: DataTypes.STRING,
    address2: DataTypes.STRING,
    district:DataTypes.STRING,
    city_id:DataTypes.TINYINT,
    postal_code:DataTypes.STRING,
    phone: DataTypes.STRING,
    location: DataTypes.GEOMETRY   
  }, {
    sequelize,
    modelName: 'Address',
  });
  return Address;
};