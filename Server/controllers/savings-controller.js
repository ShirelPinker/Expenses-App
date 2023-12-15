const express = require("express");
const router = express.Router();
const savingsLogic = require("../logic/savings-logic");

router.post("/", async (request, response, next) => {
  const newMonthlySavings =request.body
  try {
    await savingsLogic.addSavings(newMonthlySavings);
    response.json()
  }
  catch (e) {
    next(e)
  }
});

module.exports = router;
