const categoriesDal = require("../dal/categories-dal");

async function getAllCategories() {
  return  await categoriesDal.getAllCategories();
}


module.exports = {
  getAllCategories

};
