const bcrypt = require('bcryptjs');

const { generateToken } = require('./token');
const { getUserByEmail } = require('../../database/query');

async function login(req, res) {
  const { email, password, remember = false } = req.body;
  const { rows } = await getUserByEmail(email);

  if (rows.length === 0) {
    res.status(404).json({
      message: 'no user found with this email',
    });
  } else {
    const [user] = rows;
    const valid = await bcrypt.compare(password, user.password);

    if (valid) {
      const token = await generateToken(user.email);
      const time = remember ? 2592000000 : 21600000;
      const expires = new Date(Date.now() + time);

      res.cookie('user_email', token, { expires }).json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          is_admin: user.is_admin,
        },
        message: 'logged in successfully',
      });
    } else {
      res.status(400).json({ message: 'incorrect password' });
    }
  }
}

module.exports = login;
