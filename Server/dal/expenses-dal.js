const connection = require("./connection-wrapper");

async function getExpensesByMonth(month) {
  const sql = "SELECT Expenses.amount, Expenses.year, Expenses.month, Categories.name as categoryName FROM Expenses LEFT JOIN Categories ON Expenses.categoryId = Categories.id where month =?"
  const parameters = [month]
  return await connection.executeWithParameters(sql, parameters);
}
async function addExpense(newExpense){
  const sql = `insert into Expenses(amount, month, year, categoryId)` + `values(?,?,?,?)`
  const parameters = [newExpense.amount, newExpense.month, newExpense.year, newExpense.categoryId];
  await connection.executeWithParameters(sql, parameters);
}

module.exports = {
  getExpensesByMonth,
  addExpense
};
