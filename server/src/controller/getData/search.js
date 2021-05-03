const searchCourses = require('../../database/query/searchCourses');

async function search(req, res) {
  const { query } = req.params;

  const results = await searchCourses(query);

  res.json({
    query,
    message: 'done',
    results: results.rows,
    qqq: results,
  });
}

module.exports = search;
