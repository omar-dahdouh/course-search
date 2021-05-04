const searchCourses = require('../../database/query/searchCourses');
const { categoryName } = require('../../assets/catalogIndex');
const { sourceImage } = require('../../assets/sourceInfo');

async function search(req, res) {
  const { query } = req.params;

  try {
    const { rows } = await searchCourses(query);
    const results = rows.map((row) => {
      const source = categoryName.get(row.source);
      return {
        ...row,
        source,
        image: sourceImage[source](row.image),
      };
    });

    res.json({
      query,
      message: 'success',
      results,
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
