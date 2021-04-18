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
      })
      .then(card => res.status(201).send(card))
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
                })
                .then(() => res.status(201).send(card));
            })
          
          }
        )
        .catch(error => res.status(400).send(error));
  },

  // update(req, res) {
  //   return TodoItem
  //     .find({
  //       where: {
  //         id: req.params.todoItemId,
  //         todoId: req.params.todoId,
  //       },
  //     })
  //     .then(todoItem => {
  //       if (!todoItem) {
  //         return res.status(404).send({
  //           message: 'TodoItem Not Found',
  //         });
  //       }

  //       return todoItem
  //         .update({
  //           content: req.body.content || todoItem.content,
  //           complete: req.body.complete || todoItem.complete,
  //         })
  //         .then(updatedTodoItem => res.status(200).send(updatedTodoItem))
  //         .catch(error => res.status(400).send(error));
  //     })
  //     .catch(error => res.status(400).send(error));
  // },

  // destroy(req, res) {
  //   return TodoItem
  //     .find({
  //       where: {
  //         id: req.params.todoItemId,
  //         todoId: req.params.todoId,
  //       },
  //     })
  //     .then(todoItem => {
  //       if (!todoItem) {
  //         return res.status(404).send({
  //           message: 'TodoItem Not Found',
  //         });
  //       }

  //       return todoItem
  //         .destroy()
  //         .then(() => res.status(204).send())
  //         .catch(error => res.status(400).send(error));
  //     })
  //     .catch(error => res.status(400).send(error));
  // },
};
