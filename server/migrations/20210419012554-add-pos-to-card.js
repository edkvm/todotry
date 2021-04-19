'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Cards', 'pos', Sequelize.BIGINT, { 
      after: 'dueDate'
    })
    await queryInterface.sequelize.query(`update "Cards" set "pos" = 64000 where "id" > 0`)
    
    await queryInterface.changeColumn('Cards', 'pos', {type: Sequelize.STRING, allowNull: false})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Cards', 'pos')
  }
};
