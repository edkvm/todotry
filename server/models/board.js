module.exports = (sequelize, DataTypes) => {
  const Board = sequelize.define('Board', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Board.associate = (models) => {
    Board.hasMany(models.List, {
      foreignKey: 'boardId',
      as: 'lists',
    });
  };
  return Board;
};
