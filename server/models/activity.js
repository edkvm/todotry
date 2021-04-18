const { Model } = require('sequelize');

const ACTIVITY_CARD_CREATED = 'activity_card_created';
const ACTIVITY_CARD_DUEDATE_ADD = 'activity_card_duedate_add';
const ACTIVITY_LIST_CREATED = 'activity_list_created';
const ACTIVITY_BOARD_CREATED = 'activity_board_created';
const ACTIVITY_USER_COMMENTED_ON_CARD = 'activity_user_commented_on_card';

module.exports = (sequelize, DataTypes) => {
  class Activity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Activity.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'NO ACTION',
      });
      Activity.belongsTo(models.Board, {
        foreignKey: 'boardId',
        onDelete: 'NO ACTION',
      });
      Activity.belongsTo(models.Card, {
        foreignKey: 'cardId',
        onDelete: 'NO ACTION',
      });
    }
  };
  Activity.init({
    message: DataTypes.STRING,
    kind: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Activity',
  });
  Activity.ACTIVITY_CARD_CREATED = ACTIVITY_CARD_CREATED;
  Activity.ACTIVITY_CARD_DUEDATE_ADD = ACTIVITY_CARD_DUEDATE_ADD;
  Activity.ACTIVITY_LIST_CREATED = ACTIVITY_LIST_CREATED;
  Activity.ACTIVITY_BOARD_CREATED = ACTIVITY_BOARD_CREATED;
  Activity.ACTIVITY_USER_COMMENTED_ON_CARD = ACTIVITY_USER_COMMENTED_ON_CARD;
  return Activity;
};