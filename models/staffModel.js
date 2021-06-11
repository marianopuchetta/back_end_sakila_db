'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Staff extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Staff.belongsTo(models.Address, { as: 'address', foreignKey: {name: 'address_id' }});
      Staff.belongsTo(models.Store, { as:'store', foreignKey:'store_id'});
      Staff.hasOne(models.Store, { as:'manager_staff', foreignKey: 'manager_staff_id'});
      Staff.hasOne(models.Rental,{as:'staff',foreignKey:'staff_id'})
      Staff.hasOne(models.Payment,{foreignKey: 'staff_id' })
    }
  };
  Staff.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    picture: DataTypes.BLOB,
    email:DataTypes.STRING,
    active: DataTypes.TINYINT,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    
  }, {
    sequelize,
    modelName: 'Staff',
  });
  return Staff;
};