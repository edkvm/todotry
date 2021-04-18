const Board = require('../models').Board;
const Activity = require('../models').Activity;

module.exports = {
  create(req, res) {
    return Board
      .create({
        name: req.body.name,
        listOrderArray: req.params.listOrderArray,
      })
      .then(board => {
        board
          .createActivity({ kind: Activity.ACTIVITY_BOARD_CREATED })
          .then(() => res.status(201).send(board))
          .catch(error => res.status(500).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

  listActivities(req, res) {
    return Board
      .findById(req.params.boardId, {
        include: [{
          model: Activity,
          as: 'activities',
        }],
      })
      .then((board) => {
        res.status(200).send(board.activities);
      })
      .catch(error => res.status(500).send(error));
  },
};
