const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Label extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Label.belongsTo(models.Board, {
        foreignKey: 'boardId',
        onDelete: 'CASCADE',
      });
      Label.belongsToMany(models.Card, {
        through: models.CardLabel,
        foreignKey: 'labelId',
      });
    }
  }
  Label.init({
    name: DataTypes.STRING,
    color: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Label',
  });
  return Label;
};