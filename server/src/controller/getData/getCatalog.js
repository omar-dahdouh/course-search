const catalog = require('../../assets/catalog');

async function getCatalog(req, res) {
  res.json(catalog);
}

module.exports = getCatalog;
