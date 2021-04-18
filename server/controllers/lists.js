const List = require('../models').List;
const Activity = require('../models').Activity;
module.exports = {
  create(req, res) {
    return List
      .create({
        title: req.body.title,
        boardId: req.params.boardId,
      })
      .then((list) => {
        list
          .createActivity({ kind: Activity.ACTIVITY_LIST_CREATED })
          .then(() => res.status(201).send(list));
      })
      .catch((error) => res.status(400).send(error));
  },
};
