'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      City.belongsTo(models.Country, {as:'country', foreignKey: { name: 'country_id' } })
    }
  };
  City.init({
    city: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'City',
  });
  return City;
};