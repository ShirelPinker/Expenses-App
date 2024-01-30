const envLogic = require("../logic/env-logic");

const express = require("express");
const router = express.Router();

router.get("/", async (request, response, next) => {
  const isProd = request.query.isProd
  await envLogic.setEnv(isProd)

  try {
    response.json()
  } catch (e) {
    next(e)
  }
});


module.exports = router;
