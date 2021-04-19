const boardsController = require('../controllers').boards;
const listsController = require('../controllers').lists;
const labelsController = require('../controllers').labels;
const cardsController = require('../controllers').cards;
const usersController = require('../controllers').users;


module.exports = (app) => {
  app.get('/', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!',
  }));

  // Health
  app.get('/_health', (_, res) => {
    res.status(200).send({ status: 'ok', code: 200 });
  });
  // Users
  app.post('/users', usersController.create);
  app.get('/users', usersController.list);

  // Board
  app.post('/boards', boardsController.create);
  app.get('/boards', boardsController.list);
  app.patch('/boards/:boardId', boardsController.update);
  
  app.post('/boards/:boardId/lists', listsController.create);
  app.post('/boards/:boardId/labels', labelsController.create);
  
  
  // Card
  app.post('/lists/:listId/cards', cardsController.create);
  app.post('/cards/:cardId/comments', cardsController.comment);
  app.get('/cards/:cardId', cardsController.retrieve);
  app.patch('/cards/:cardId/members', cardsController.addMember);
};
