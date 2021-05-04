const sourceImage = {
  udemy: (url) => `https://img-b.udemycdn.com/course/240x135/${url}`,
  coursera: (url) =>
    `https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/` +
    `https://coursera-course-photos.s3.amazonaws.com/${url}` +
    `?auto=format%2Ccompress&dpr=1&w=150&h=150&fit=fill&bg=FFF&q=25`,
  edx: (url) => `https://prod-discovery.edx-cdn.org/media/course/image/${url}`,
  alison: (url) => `https://cdn01.alison-static.net/courses/${url}`,
  futurelearn: (url) => `https://ugc.futurelearn.com/uploads/images/${url}`,
};

const sourceLink = {
  udemy: (url) => `https://www.udemy.com/course/${url}`,
  coursera: (url) => `https://www.coursera.org/learn/${url}`,
  edx: (url) => `https://www.edx.org/course/${url}`,
  alison: (url) => `https://alison.com/courses/${url}`,
  futurelearn: (url) => `https://www.futurelearn.com/courses/${url}`,
};

module.exports = {
  sourceImage,
  sourceLink,
};
