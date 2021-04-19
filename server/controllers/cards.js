const Card = require('../models').Card;
const Member = require('../models').Member;
const Label = require('../models').Label;
const List = require('../models').List;
const Activity = require('../models').Activity;
const CardLabel = require('../models').CardLabel;

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

  addMember(req, res) {
    return Card
      .findByPk(req.params.cardId)
      .then((card) => {
        if (card === null) {
          return res.status(404).send({ error: 'card does exist '});
        }
        Member
          .create({
            userId: req.body.memberId,
            cardId: card.id,
            relationshipType: 'user_watcher',
          })
          .then(() => {
            res.status(201).send(card);
          });
      })
      .catch(e => res.status(400).send(e));
  },

  addLabel(req, res) {
    return Card
      .findByPk(req.params.cardId)
      .then((card) => {
        if (card === null) {
          return res.status(404).send({ error: 'card does exist '});
        }
        CardLabel
          .create({
            labelId: req.body.labelId,
            cardId: card.id,
          })
          .then(() => {
            res.status(201).send(card);
          });
      })
      .catch(e => {
        
        res.status(400).send(e)
      });
  },

  moveCard(req, res) {
    return Card
      .findByPk(req.params.cardId)
      .then((card) => {
        let prevListId = card.listId
        card
          .update({
            pos: req.body.pos || card.pos,
            listId: req.body.listId || card.listId,
          })
          .then(() => {
            // Card Changed Lists
            if (req.body.listId || req.body.listId === prevListId) {
              return List
                .findByPk(card.listId)
                .then((list) => {
                  Activity.create(
                    {
                      kind: Activity.ACTIVITY_CARD_MOVED_LIST,
                      cardId: card.id,
                      listId: card.listId,
                      boardId: list.boardId,
                    });
                });
            }
          })
          .then(() => res.status(200).send(card));
      })
      .catch(e => req.status(500).send(e));
  },

  retrieve(req, res) {
    return Card
      .findByPk(req.params.cardId, {
        include: [{
          model: Activity,
          as: 'activities',
        }, {
          model: Label,
          as: 'labels',
          through: { attributes: [] }
        }],
        
      })
      .then((card) => {
        res.status(200).send(card);
      })
      .catch((e) => {
        console.log(e);
        res.status(500).send(e)
      });

  }
};
