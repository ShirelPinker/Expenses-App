const connection = require("./connection-wrapper");

async function getExpensesByMonth(month) {
  const sql = "SELECT Expenses.id, Expenses.amount, Expenses.year, Expenses.month, Expenses.description, Categories.name as categoryName FROM Expenses LEFT JOIN Categories ON Expenses.categoryId = Categories.id where month =?"
  const parameters = [month]
  return await connection.executeWithParameters(sql, parameters);
}

async function getExpensesByYear(year) {
  const sql = "SELECT Expenses.id, Expenses.amount, Expenses.year, Expenses.month, Expenses.description, Categories.name as categoryName FROM Expenses LEFT JOIN Categories ON Expenses.categoryId = Categories.id where year =?"
  const parameters = [year]
  return await connection.executeWithParameters(sql, parameters);
}

async function getExpensesByMonthAndYear(month, year) {
  const sql = "SELECT Expenses.id, Expenses.amount, Expenses.year, Expenses.month, Expenses.description, Categories.name as categoryName FROM Expenses LEFT JOIN Categories ON Expenses.categoryId = Categories.id where month=? and year =?"
  const parameters = [month, year]
  return await connection.executeWithParameters(sql, parameters);
}

async function addExpense(newExpense) {
  const sql = `insert into Expenses(amount, month, year, categoryId, description)` + `values(?,?,?,?,?)`
  const parameters = [newExpense.amount, newExpense.month, newExpense.year, newExpense.categoryId, newExpense.description];
  await connection.executeWithParameters(sql, parameters);
}

async function deleteExpense(expenseId) {
  const sql = `DELETE FROM Expenses WHERE id = ${expenseId}`;

  await connection.execute(sql);
}

module.exports = {
  getExpensesByMonth,
  getExpensesByYear,
  getExpensesByMonthAndYear,
  addExpense,
  deleteExpense
};
