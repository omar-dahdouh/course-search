const { sourceImage } = require('../../assets/sourceInfo');
const { categoryName } = require('../../assets/catalogIndex');
const { getUserFavorite } = require('../../database/query');
const authenticate = require('../user/authenticate');

async function addFavorite(req, res) {
  const token = req.cookies.user_email;
  const { user, error } = await authenticate(token);

  if (error) {
    res.status(401).json({ message: 'unauthorized' });
  } else {
    try {
      const { rows } = await getUserFavorite(user.id);
      const courses = rows.map((course) => {
        const source = categoryName.get(course.category[0]);
        return {
          category: course.category.map((id) => {
            return { id, name: categoryName.get(id) };
          }),
          id: course.id,
          image: sourceImage[source](course.image),
          rating: course.rating,
          reviews: course.reviews,
          source,
          title: course.title,
        };
      });
      res.json({ courses });
    } catch ({ message }) {
      res.status(500).json({ message: 'something went wrong' });
    }
  }
}

module.exports = addFavorite;
