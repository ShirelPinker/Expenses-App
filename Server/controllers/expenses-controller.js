const expensesLogic = require("../logic/expenses-logic");
const express = require("express");
const router = express.Router();


router.get("/", async (request, response, next) => {
  const month = request.query.month;
  const year = request.query.year;
  if (!year && !month) {
    response.status(400).send('Bad Request: Your request is invalid')
  }
  let expenses;
  try {
    if (month && year) {
      expenses = await expensesLogic.getExpensesByMonthAndYear(month, year);
    } else if (year) {
      expenses = await expensesLogic.getExpensesByYear(year);
    } else {
      expenses = await expensesLogic.getExpensesByMonth(month);
    }
    response.json(expenses);
  } catch (e) {
    next(e)
  }
});
router.post("/", async (request, response, next) => {
  const newExpense = request.body;

  try {
    await expensesLogic.addExpense(newExpense);
    response.json();
  } catch (e) {
    next(e)
  }
});
router.put("/:id", async (request, response, next) => {
  const updatedExpenseId = request.params.id
  const updatedExpense = request.body;

  try {
    await expensesLogic.updateExpense(updatedExpenseId, updatedExpense);
    response.json();
  } catch (e) {
    next(e)
  }
});
router.delete("/:id", async (request, response, next) => {
  const expenseId = request.params.id;

  try {
    await expensesLogic.deleteExpense(expenseId);
    response.json();
  } catch (e) {
    next(e)
  }
});
module.exports = router;
