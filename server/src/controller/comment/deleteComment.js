const authenticate = require('../user/authenticate');
const { getCommentById, deleteCommentById } = require('../../database/query');

async function deleteComment(req, res) {
  const token = req.cookies.user_email;
  const { user, error } = await authenticate(token);

  if (error) {
    res.status(401).json({ message: 'unauthorized' });
  } else {
    const { commentId } = req.params;
    const { rows } = await getCommentById(commentId);

    if (rows.length === 0) {
      res.status(404).json({ message: 'comment not found' });
    } else {
      if (user.id === rows[0].user_id) {
        const { rowCount } = await deleteCommentById(commentId);

        if (rowCount === 0) {
          res.status(500).json({
            message: 'failed to delete comment',
          });
        } else {
          res.json({
            message: 'comment has been deleted successfully',
          });
        }
      } else {
        res.status(401).json({
          message: "you don't have permission to perform this action",
        });
      }
    }
  }
}

module.exports = deleteComment;
