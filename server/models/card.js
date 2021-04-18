module.exports = (sequelize, DataTypes) => {
  const Card = sequelize.define('Card', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });
  Card.associate = (models) => {
    Card.belongsTo(models.List, {
      foreignKey: 'listId',
      onDelete: 'CASCADE',
    });
    Card.hasMany(models.Activity, {
      foreignKey: 'cardId',
      as: 'activities',
      onDelete: 'CASCADE',
    });
    Card.belongsToMany(models.User, {
      through: models.Member,
      foreignKey: 'cardId',
    });
  };
  
  return Card;
};
