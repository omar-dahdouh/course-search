const searchCourses = require('../../database/query/searchCourses');
const { categoryName } = require('../../assets/catalogIndex');

async function search(req, res) {
  const { query } = req.params;

  try {
    const { rows } = await searchCourses(query);

    // console.log({ rows });
    res.json({
      query,
      message: 'success',
      results: rows.map((row) => {
        return { ...row, source: categoryName.get(row.source) };
      }),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      query,
      message: 'failed',
      results: [],
    });
  }
}

module.exports = search;
