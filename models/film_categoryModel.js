'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Film_category extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            //define association here
            Film_category.belongsTo(models.Category, { as: 'category', foreignKey: { name: 'category_id' } })
            Film_category.belongsTo(models.Film, { as: 'film', foreignKey: { name: 'film_id' } })
        }
    }
    Film_category.init({
    }, {
        sequelize,
        modelName: 'Film_category'
    });
    return Film_category
}