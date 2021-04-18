const Label = require('../models').Label;

module.exports = {
  create(req, res) {
    return Label
      .create({
        color: req.body.color,
        name: req.body.name,
        boardId: req.params.boardId,
      })
      .then((label) => res.status(201).send(label))
      .catch((error) => res.status(400).send(error));
  },
};
