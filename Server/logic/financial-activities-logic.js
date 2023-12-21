const financialActivitiesDal = require("../dal/financial-activities-dal");

async function addFinancialActivities(newMonthlyFinancialActivities) {
  return  await financialActivitiesDal.addFinancialActivities(newMonthlyFinancialActivities);
}


module.exports = {
  addFinancialActivities

};
