const ACTIVITY_CARD_CREATED = 'activity_card_created';
const ACTIVITY_CARD_DUEDATE_ADD = 'activity_card_duedate_add';
const ACTIVITY_LIST_CREATED = 'activity_list_created';
const ACTIVITY_BOARD_CREATED = 'activity_board_created';
const ACTIVITY_USER_COMMENTED_ON_CARD = 'activity_user_commented_on_card';

module.exports = (sequelize, DataTypes) => {
  const Activity = sequelize.define('Activity', {
    message: DataTypes.STRING,
    kind: DataTypes.STRING,
  });

  Activity.associate = (models) => {
    Activity.belongsTo(models.Board, {
      foreignKey: 'boardId',
      onDelete: 'NO ACTION',
    });
    Activity.belongsTo(models.List, {
      foreignKey: 'listId',
      onDelete: 'NO ACTION',
    });
    Activity.belongsTo(models.Card, {
      foreignKey: 'cardId',
      onDelete: 'NO ACTION',
    });
  };

  Activity.ACTIVITY_CARD_CREATED = ACTIVITY_CARD_CREATED;
  Activity.ACTIVITY_CARD_DUEDATE_ADD = ACTIVITY_CARD_DUEDATE_ADD;
  Activity.ACTIVITY_LIST_CREATED = ACTIVITY_LIST_CREATED;
  Activity.ACTIVITY_BOARD_CREATED = ACTIVITY_BOARD_CREATED;
  Activity.ACTIVITY_USER_COMMENTED_ON_CARD = ACTIVITY_USER_COMMENTED_ON_CARD;

  return Activity;
};