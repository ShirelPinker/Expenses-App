const categoriesDal = require("../dal/categories-dal");

async function getAllCategories() {
  return  await categoriesDal.getAllCategories();
}

async function deleteCategory(categoryId){
  return await categoriesDal.deleteCategory(categoryId);
}

async function addCategory(newCategory){
  return await categoriesDal.addCategory(newCategory);
}

async function editCategory(updatedCategory){
  return await categoriesDal.editCategory(updatedCategory);
}

module.exports = {
  getAllCategories,
  deleteCategory,
  addCategory,
  editCategory

};
