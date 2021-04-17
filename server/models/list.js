module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define('List', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  List.associate = (models) => {
    List.hasMany(models.Card, {
      foreignKey: 'listId',
      as: 'cards',
    });
    List.belongsTo(models.Board, {
      foreignKey: 'boardId',
      onDelete: 'CASCADE',
    });
  };
  return List;
};
