const connection = require("./connection-wrapper");

async function getAllCategories() {
  const sql = "SELECT * FROM Categories"
  return await connection.execute(sql);
}
async function deleteCategory(categoryId){
  const sql = `DELETE FROM Categories WHERE id = ${categoryId}`;
  return await connection.execute(sql);
}
async function addCategory(newCategory) {
  const sql = `insert into Categories(name)` + `values(?)`
  const parameters = [newCategory.name];
  await connection.executeWithParameters(sql, parameters);
}

async function editCategory(updatedCategory) {
  const sql = `UPDATE Categories SET name = ? WHERE id = ?`;
  const parameters = [updatedCategory.name, updatedCategory.id];
  await connection.executeWithParameters(sql, parameters);
}
module.exports = {
  getAllCategories,
  deleteCategory,
  addCategory,
  editCategory
};
