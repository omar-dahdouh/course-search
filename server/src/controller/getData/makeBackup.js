const fs = require('fs');
const { join } = require('path');

const { getAllCourses } = require('../../database/query');

async function backup(req, res) {
  const { rows } = await getAllCourses();
  const courses = rows.map((course) => {
    return [
      course.url,
      course.title,
      course.image,
      course.rating,
      course.reviews,
      course.description,
      course.category,
      course.date,
    ];
  });

  const filePath = join(__dirname, '..', '..', 'assets', 'backup.json');
  const fileData = JSON.stringify(courses);
  await fs.promises.writeFile(filePath, fileData);

  res.json({
    message: 'success',
    count: courses.length,
  });
}

module.exports = backup;
