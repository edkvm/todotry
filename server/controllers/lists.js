const List = require('../models').List;

module.exports = {
  create(req, res) {
    return List
      .create({
        title: req.body.title,
        boardId: req.params.boardId,
      })
      .then((list) => res.status(201).send(list))
      .catch((error) => res.status(400).send(error));
  },
};
