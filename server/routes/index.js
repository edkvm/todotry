const boardsController = require('../controllers').boards;
const listsController = require('../controllers').lists;
const cardsController = require('../controllers').cards;


module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!',
  }));

  app.post('/api/boards', boardsController.create);
  app.post('/api/boards/:boardId/lists', listsController.create);
  app.post('/api/lists/:listId/cards', cardsController.create);
};
