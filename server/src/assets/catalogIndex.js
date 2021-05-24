const catalog = require('./catalog');

const categoryName = new Map();
const categoryParent = new Map();
const categoryChildren = new Map();

function addToIndex(cats, parent) {
  for (const { id, name, sub = [] } of cats) {
    categoryName.set(id, name);
    categoryParent.set(id, parent);
    categoryChildren.set(
      id,
      sub.map((c) => c.id)
    );
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

function getSubTree(id) {
  const sub = categoryChildren.get(id) || [];
  let res = [...sub];
  sub.forEach((id) => {
    res = res.concat(getSubTree(id));
  });

  return res;
}

function categorySubTree(id) {
  return [id, ...getSubTree(id)];
}

module.exports = {
  categoryName,
  categoryParent,
  categoryChildren,
  categorySubTree,
  categoryPath,
};
