const { Comment, Pizza } = require("../models");

const commentController = {
  // add comment to pizza
  // __________________________question this part _______________________________________
  addComment({ params, body }, res) {
    console.log("=================================", body);
    Comment.create(body)
      // decontructing params.id
      .then(({ _id }) => {
        return Pizza.findOneAndUpdate(
          { _id: params.pizzaId },
          //   The $push method works just the same way that it
          //   works in JavaScript—it adds data to an array.All
          //   of the MongoDB - based functions like $push start
          //   with a dollar sign($), making it easier to look at
          // functionality
          { $push: { comments: _id } },
          //   Again, because we passed the option of new: true,
          //   we're receiving back the updated pizza (the pizza
          //     with the new comment included).
          { new: true, runValidators: true }
        );
      })
      // =============================================================
      .then((dbPizzaData) => {
        if (!dbPizzaData) {
          res.status(404).json({ message: "No pizza found with this id!" });
          return;
        }
        return res.json(dbPizzaData);
      })
      .catch((err) => res.json(err));
  },
  // add reply to comment
  addReply({ params, body }, res) {
    Comment.findOneAndUpdate(
      { _id: params.commentId },
      { $push: { replies: body } },
      { new: true, runValidators: true }
    )
      .then((dbPizzaData) => {
        if (!dbPizzaData) {
          res.status(404).json({ message: "No pizza found with this id!" });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch((err) => res.json(err));
  },

  // he first method used here, .findOneAndDelete(), works a lot like
  // .findOneAndUpdate(), as it deletes the document while also
  // returning its data.We then take that data and use it to identify
  // and remove it from the associated pizza using the Mongo $pull
  // operation.Lastly, we return the updated pizza data, now without
  // the _id of the comment in the comments array, and return it to
  // the user

  removeComment({ params }, res) {
    Comment.findOneAndDelete({ _id: params.commentId })
      .then((deletedComment) => {
        if (!deletedComment) {
          return res.status(404).json({ message: "No comment with this id!" });
        }
        return Pizza.findOneAndUpdate(
          { _id: params.pizzaId },
          { $pull: { comments: params.commentId } },
          { new: true }
        );
      })
      .then((dbPizzaData) => {
        if (!dbPizzaData) {
          res.status(404).json({ message: "No pizza found with this id!" });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch((err) => res.status(400).json(err));
  },
  // remove reply
  removeReply({ params }, res) {
    Comment.findOneAndUpdate(
      { _id: params.commentId },
      { $pull: { replies: { replyId: params.replyId } } },
      { new: true }
    )
      .then((dbPizzaData) => res.json(dbPizzaData))
      .catch((err) => res.json(err));
  },
};

module.exports = commentController;
