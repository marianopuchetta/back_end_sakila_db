'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Language extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Language.belongsTo(models.Film,{foreignKey:'language_id'})
      Language.belongsTo(models.Film,{foreignKey:'original_language_id'})
    }
  };
  Language.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Language',
  });
  return Language;
};