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

module.exports = {
  getAllCategories,
  deleteCategory,
  addCategory
};
