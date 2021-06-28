const fs = require('fs');
const { join } = require('path');

const { insertCourses } = require('../../database/query');

async function backup(req, res) {
  const filePath = join(__dirname, '..', '..', 'assets', 'backup.json');
  const fileData = await fs.promises.readFile(filePath);

  const courses = JSON.parse(fileData).map(
    ([url, title, image, rating, reviews, description, category, date]) => {
      return {
        url,
        title,
        image,
        rating,
        reviews,
        description,
        category,
        date,
      };
    }
  );

  const { rowCount } = await insertCourses(courses);
  res.json({
    message: 'success',
    count: rowCount,
  });
}

module.exports = backup;
