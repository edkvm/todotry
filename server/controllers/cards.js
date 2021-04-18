const Card = require('../models').Card;
const List = require('../models').List;
const Activity = require('../models').Activity;

module.exports = {
  create(req, res) {
    return Card
      .create({
        title: req.body.title,
        description: req.body.description,
        dueDate: req.body.dueDate || null,
        listId: req.params.listId,
        pos: req.body.pos || 0,
      })
      .then((card) => {
        List
          .findByPk(card.listId)
          .then((list) => {
            Activity.create(
              {
                kind: Activity.ACTIVITY_CARD_CREATED,
                cardId: card.id,
                listId: card.listId,
                boardId: list.boardId,
              })
              .then(() => res.status(201).send(card))
          });
      })
      .catch(error => res.status(400).send(error));
  },

  comment(req, res) {
    return Card
        .findByPk(req.params.cardId)
        .then((card) => {
          List
            .findByPk(card.listId)
            .then((list) => {
              card
                .createActivity({
                  message: req.body.message,
                  kind: Activity.ACTIVITY_USER_COMMENTED_ON_CARD ,
                  listId: card.listId,
                  boardId: list.boardId,
                  isGenerate: false,
                })
                .then(() => res.status(201).send(card));
            });
        })
        .catch(error => res.status(400).send(error));
  },

  retrieve(req, res) {
    return Card
      .findByPk(req.params.cardId, {
        include: [{
          model: Activity,
          as: 'activities',
        }],
      })
      .then((card) => {
        res.status(200).send(card);
      })
      .catch((e) => {
        res.status(500).send(e)
      });

  }
};
