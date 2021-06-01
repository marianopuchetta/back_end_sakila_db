'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Film extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Film.belongsTo(models.Language, { foreignKey: { name: 'language_id' } })
      Film.belongsTo(models.Language, { foreignKey: { name: 'original_language_id' } });
      Film.belongsToMany(models.Actor, {
        through: models.Film_actor,
        as: 'filmHasActor',
        foreignKey: 'film_id',
        otherKey: 'actor_id',
      }),
      Film.belongsToMany(models.Store, {
        through: models.Inventory,
        as: 'filmHasInvnetory',
        foreignKey: 'film_id',
        otherKey: 'store_id',
      })
    }
  };
  Film.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    release_year: DataTypes.STRING,
    rental_duration: DataTypes.STRING,
    rental_rate: DataTypes.DECIMAL(4, 2),
    length: DataTypes.INTEGER,
    replacement_cost: DataTypes.DECIMAL(5, 2),
    rating: {
      type: DataTypes.ENUM,
      values: ['G', 'PG', 'PG-13', 'R', 'NC-17']
    },
    special_features: {
      type: DataTypes.ENUM,
      values: ['Trailers', 'Commentaries', 'Deleted Scenes', 'Behind the Scenes']
    }
  }, {
    sequelize,
    modelName: 'Film',
  });
  return Film;
};