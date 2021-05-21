'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Film_actor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Film_actor.belongsTo(models.Actor, { as: 'actor', foreignKey: { name: 'actor_id' }})
      Film_actor.belongsTo(models.Film, { as: 'film', foreignKey: { name: 'film_id' }})

    }
  };
  Film_actor.init({
  }, {
    sequelize,
    modelName: 'Film_actor',
  });
  return Film_actor;
};