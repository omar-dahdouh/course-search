const Joi = require('joi');
const bcrypt = require('bcryptjs');

const { insertComment } = require('../../database/query');
const authenticate = require('../user/authenticate');

const commentSchema = Joi.object({
  content: Joi.string().min(1).max(255).required(),
  course_id: Joi.number().integer().min(1).required(),
});

async function addComment(req, res) {
  const token = req.cookies.user_email;
  const { user, error } = await authenticate(token);

  if (error) {
    res.status(401).json({ message: 'unauthorized' });
  } else {
    try {
      const fields = req.body;
      const { content, course_id } = await commentSchema.validateAsync(fields);

      const { rows } = await insertComment({
        content,
        courseId: course_id,
        userId: user.id,
      });
      if (rows.length === 0) {
        res.status(400).json({ message: 'something went wrong' });
      } else {
        res.json({
          message: 'inserted succeffuly',
          comment: {
            id: rows[0].id,
            content,
          },
        });
      }
    } catch ({ message }) {
      res.status(400).json({ message });
    }
  }
}

module.exports = addComment;
