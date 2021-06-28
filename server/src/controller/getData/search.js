const { searchInTitle, searchInDescription } = require('../../database/query');
const { categoryName } = require('../../assets/catalogIndex');
const { sourceImage } = require('../../assets/sourceInfo');

async function search(req, res) {
  const {
    query = '',
    inTitle = true,
    category = 0,
    offset = 0,
    limit = 12,
    ratingRange = [0, 5],
    maxDate = new Date().toISOString(),
    providers = [1, 148, 203, 235, 245],
  } = req.body;

  try {
    const options = {
      query,
      categories: category ? [category] : providers,
      offset,
      limit,
      maxDate,
      ratingRange,
    };

    const { rows } = inTitle
      ? await searchInTitle(options)
      : await searchInDescription(options);

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
