module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Lists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      boardId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'Boards',
          key: 'id',
          as: 'boardId',
        },
      },
    }),
  down: (queryInterface /* , Sequelize */) => queryInterface.dropTable('Lists'),
};
