const Joi = require('joi');
const bcrypt = require('bcryptjs');

const {
  getUserByEmail,
  registerUser,
  setAdmin,
} = require('../../database/query');

const userSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(32).required(),
  password: Joi.string().alphanum().min(8).max(32).required(),
  email: Joi.string().email().required(),
});

async function register(req, res) {
  const fields = req.body;

  try {
    const { name, email, password } = await userSchema.validateAsync(fields);
    console.log({ name, email, password });

    const { rows } = await getUserByEmail(email);
    if (rows.length !== 0) {
      res.status(409).json({
        message: 'an account with this email already exists',
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      const { rows } = await registerUser({
        name,
        email,
        password: hash,
      });

      const [user] = rows;
      if (user) {
        if (user.id === 1) {
          // first user to register becomes admin
          await setAdmin(user.id, true);
        }

        res.status(201).json({
          id: user.id,
          message: 'successfully registered',
        });
      } else {
        res.status(500).json({
          message: 'something went wrong',
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
}

module.exports = register;
