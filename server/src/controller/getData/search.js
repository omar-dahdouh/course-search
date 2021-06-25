const { searchCourses } = require('../../database/query');
const { categoryName } = require('../../assets/catalogIndex');
const { sourceImage } = require('../../assets/sourceInfo');

async function search(req, res) {
  const { query = '', category = 0, offset = 0, limit = 12 } = req.body;

  try {
    const { rows } = await searchCourses({ query, category, offset, limit });
    const results = rows.map((row) => {
      const source = categoryName.get(row.category[0]);
      return {
        category: row.category.map((id) => {
          return { id, name: categoryName.get(id) };
        }),
        id: row.id,
        image: sourceImage[source](row.image),
        rating: row.rating,
        reviews: row.reviews,
        source,
        title: row.title,
      };
    });

    res.json({
      query,
      message: 'success',
      results,
      count: rows[0] ? +rows[0].full_count : 0,
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
