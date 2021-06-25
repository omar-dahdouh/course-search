const { verifyToken } = require('./token');
const { getUserByEmail } = require('../../database/query');

async function authenticate(token) {
  try {
    const email = await verifyToken(token);
    const { rows } = await getUserByEmail(email);

    if (rows.length !== 0) {
      const { id, name, email, is_admin } = rows[0];
      return {
        user: { id, name, email, is_admin },
        error: null,
      };
    }
    return {
      user: null,
      error: { message: 'this account no longer exists' },
    };
  } catch (error) {
    return {
      user: null,
      error: { message: 'unauthorized' },
    };
  }
}

module.exports = authenticate;
