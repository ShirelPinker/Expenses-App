const express = require("express");
const router = express.Router();
const financialActivitiesLogic = require("../logic/financial-activities-logic");
const expensesLogic = require("../logic/expenses-logic");

router.post("/", async (request, response, next) => {
  const newMonthlyFinancialActivities =request.body
  try {
    await financialActivitiesLogic.addFinancialActivities(newMonthlyFinancialActivities);
    response.json()
  }
  catch (e) {
    next(e)
  }
});

router.get("/", async (request, response, next) => {
  const month = request.query.month;
  const year = request.query.year;
  if (!year && !month) {
    financialActivities = await financialActivitiesLogic.getAllFinancialActivities()
  }
  let financialActivities;
  try {
    if (month && year) {
      financialActivities = await financialActivitiesLogic.getFinancialActivitiesByMonthAndYear(month, year);
    } else if (year) {
      financialActivities = await financialActivitiesLogic.getFinancialActivitiesByYear(year);
    } else {
      financialActivities = await financialActivitiesLogic.getFinancialActivitiesByMonth(month);
    }
    response.json(financialActivities);
  } catch (e) {
    next(e)
  }
});

module.exports = router;
