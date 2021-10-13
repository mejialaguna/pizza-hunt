const router = require("express").Router();
const {
  addComment,
  removeComment,
  addReply,
  removeReply,
} = require("../../controllers/comment-controller");

// you need two parameters to delete a comment.Remember that
// after deleting a particular comment, you need to know
// exactly which pizza that comment originated from.

// /api/comments/<pizzaId>
router.route('/:pizzaId').post(addComment);

// /api/comments/<pizzaId>/<commentId>
router.route("/:pizzaId/:commentId")
  .put(addReply)
  .delete(removeComment);


// This is a PUT route, instead of a POST, because technically we're not creating a new reply resource.
// Instead, we're just updating the existing comment resource. This is also reflected in the endpoint,
// because we make no reference to a reply resource.

// /api/comments/<pizzaId>/<commentId>/<replyId>
router.route('/:pizzaId/:commentId/:replyId').delete(removeReply);

module.exports = router;
