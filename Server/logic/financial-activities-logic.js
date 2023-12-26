const financialActivitiesDal = require("../dal/financial-activities-dal");

async function addFinancialActivities(newMonthlyFinancialActivities) {
  return  await financialActivitiesDal.addFinancialActivities(newMonthlyFinancialActivities);
}

async function getAllFinancialActivities() {
  return await financialActivitiesDal.getAllFinancialActivities();
}

async function getFinancialActivitiesByMonth(month) {
  return await financialActivitiesDal.getFinancialActivitiesByMonth(month);
}

async function getFinancialActivitiesByYear(year) {
  return await financialActivitiesDal.getFinancialActivitiesByYear(year);
}

async function getFinancialActivitiesByMonthAndYear(month, year) {
  return await financialActivitiesDal.getFinancialActivitiesByMonthAndYear(month, year);
}

module.exports = {
  addFinancialActivities,
  getFinancialActivitiesByMonth,
  getFinancialActivitiesByYear,
  getFinancialActivitiesByMonthAndYear,
  getAllFinancialActivities

};
