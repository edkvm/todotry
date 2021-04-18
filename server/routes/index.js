const boardsController = require('../controllers').boards;
const listsController = require('../controllers').lists;
const cardsController = require('../controllers').cards;
const usersController = require('../controllers').users;


module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!',
  }));

  // Users
  app.post('/api/users', usersController.create);
  app.post('/api/boards', boardsController.create);
  app.post('/api/boards/:boardId/lists', listsController.create);
  app.post('/api/lists/:listId/cards', cardsController.create);
};
