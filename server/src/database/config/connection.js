require('env2')('../config.env');
const { Pool } = require('pg');

let dbUrl;
switch (process.env.NODE_ENV) {
  case 'development':
    dbUrl = process.env.DB_URL;
    break;

  case 'production':
    dbUrl = process.env.DATABASE_URL;
    break;

  case 'test':
    dbUrl = process.env.TEST_DB_URL;
    break;

  default:
    throw new Error('No Database URL!!!');
}

const options = {
  connectionString: dbUrl,
  ssl:
    process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : false,
};

module.exports = new Pool(options);
