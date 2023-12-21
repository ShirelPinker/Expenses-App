const express = require("express");
const router = express.Router();
const financialActivitiesLogic = require("../logic/financial-activities-logic");

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

module.exports = router;
