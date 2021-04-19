const Label = require('../models').Label;
const Board = require('../models').Board;

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

  update(req, res) {
    return Label
      .findOne({ where: { id: req.params.labelId } }, {
        include: [{
          model: Board,
          as: 'board',
          where: {
            boardId: req.params.boardId,
          },
        }],
      })
      .then((label) => {
        label
          .update({
            name: req.body.name || '',
            color: req.body.color,
          })
          .then(() => res.status(200).send(label));
      })
      .catch(e => res.status(500).send(e));
  },

  list(req, res) {
    return Board
      .findByPk(req.params.boardId, {
        include: [{
          model: Label,
          as: 'labels',
        }],
      })
      .then((board) => {
        res.status(200).send(board.labels);
      })
      .catch(e => res.status(500).send(e));
  },
};
