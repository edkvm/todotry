const { Model }  = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CardLabel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  CardLabel.init({
    cardId: DataTypes.INTEGER,
    labelId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'CardLabel',
  });
  return CardLabel;
};