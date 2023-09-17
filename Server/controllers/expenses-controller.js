const expensesLogic = require("../logic/expenses-logic");
const express = require("express");
const router = express.Router();


router.get("/", async (request, response, next) => {
  const month = request.query.month;

  try {
    const expenses = await expensesLogic.getExpensesByMonth(month);
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

module.exports = router;
