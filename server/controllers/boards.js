const Board = require('../models').Board;

module.exports = {
  create(req, res) {
    return Board
      .create({
        name: req.body.name,
        listOrderArray: req.params.listOrderArray,
      })
      .then(board => res.status(201).send(board))
      .catch(error => res.status(400).send(error));
  },
};
