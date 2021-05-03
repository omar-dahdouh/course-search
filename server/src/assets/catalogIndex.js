const catalog = require('./catalog');

const categoryName = new Map();
const categoryParent = new Map();

function addToIndex(cats, parent) {
  for (const { id, name, sub } of cats) {
    categoryName.set(id, name);
    categoryParent.set(id, parent);
    if (sub) addToIndex(sub, id);
  }
}
addToIndex(catalog, 0);

function categoryPath(id) {
  let catID = id;
  const path = [];
  while (catID > 0) {
    path.push({
      id: catID,
      name: categoryName.get(catID),
    });
    catID = categoryParent.get(catID);
  }
  return path.reverse();
}

module.exports = {
  categoryName,
  categoryParent,
  categoryPath,
};
