const expensesDal = require("../dal/expenses-dal");
const categoriesDal = require("../dal/categories-dal");


async function getExpensesByMonth(month) {
  return await expensesDal.getExpensesByMonth(month);
}

async function getExpensesByYear(year) {
  return await expensesDal.getExpensesByYear(year);
}

async function getExpensesByMonthAndYear(month, year) {
  return await expensesDal.getExpensesByMonthAndYear(month, year);
}

async function addExpense(newExpense){
  return await expensesDal.addExpense(newExpense);
}

async function deleteExpense(expenseId){
  return await expensesDal.deleteExpense(expenseId);
}
async function updateExpense(updatedExpenseId, updatedExpense){
  return await expensesDal.updateExpense(updatedExpenseId, updatedExpense)
}

module.exports = {
  getExpensesByMonth,
  getExpensesByYear,
  getExpensesByMonthAndYear,
  addExpense,
  deleteExpense,
  updateExpense
};
