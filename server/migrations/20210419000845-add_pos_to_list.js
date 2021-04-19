'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Lists', 'pos', Sequelize.BIGINT, { 
      after: 'title'
    })
    await queryInterface.sequelize.query(`update "Lists" set "pos" = 64000 where "id" > 0`)
    
    await queryInterface.changeColumn('Lists', 'pos', {type: Sequelize.STRING, allowNull: false})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('List', 'pos')
  }
};
