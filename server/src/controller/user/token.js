const jwt = require('jsonwebtoken');
require('env2')('../config.env');

function generateToken(data) {
  const { secretKey } = process.env;
  return new Promise((resolve, reject) => {
    jwt.sign(data, secretKey, { algorithm: 'HS256' }, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
}

function verifyToken(token) {
  const { secretKey } = process.env;
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) reject(err);
      resolve(decoded);
    });
  });
}

module.exports = { generateToken, verifyToken };
