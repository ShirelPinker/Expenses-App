const expensesDal = require("../dal/expenses-dal");
const categoriesDal = require("../dal/categories-dal");


async function getExpensesByMonth(month) {
  return await expensesDal.getExpensesByMonth(month);
}
async function addExpense(newExpense){

  return await expensesDal.addExpense(newExpense);
}
module.exports = {
  getExpensesByMonth,
  addExpense
};
