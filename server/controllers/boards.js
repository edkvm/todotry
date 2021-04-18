const Board = require('../models').Board;
const Activity = require('../models').Activity;
const Label = require('../models').Label;

module.exports = {
  create(req, res) {
    return Board
      .create({
        name: req.body.name,
      })
      .then(board => {
        board
          .createActivity({ kind: Activity.ACTIVITY_BOARD_CREATED })
          .then(() => {
            return Label.bulkCreate([
                { boardId: board.id, color: '#DFFF00' },
                { boardId: board.id, color: '#FFBF00' },
                { boardId: board.id, color: '#FF7F50' },
                { boardId: board.id, color: '#DE3163' },
                { boardId: board.id, color: '#9FE2BF' },
                { boardId: board.id, color: '#40E0D0' },
                { boardId: board.id, color: '#6495ED' },
                { boardId: board.id, color: '#CCCCFF' },
              ],
              { returning: true }
            );
          })
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
