const connection = require("./connection-wrapper");

async function getAllCategories() {
  const sql = "SELECT * FROM Categories"
  return await connection.execute(sql);
}


module.exports = {
  getAllCategories,
};
