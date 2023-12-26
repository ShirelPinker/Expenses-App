const connection = require("./connection-wrapper");

async function addFinancialActivities(newMonthlyFinancialActivities) {
  const sql = `
    INSERT INTO FinancialActivities (type, amount, year, month)
    VALUES (?, ?, ?, ?)
  `;

  const parameters = [
    newMonthlyFinancialActivities.type,
    newMonthlyFinancialActivities.amount,
    newMonthlyFinancialActivities.year,
    newMonthlyFinancialActivities.month,
  ];

  await connection.executeWithParameters(sql, parameters);
}

async function getAllFinancialActivities() {
  const sql = "SELECT * FROM FinancialActivities"
  return await connection.execute(sql);
}

async function getFinancialActivitiesByMonth(month) {
  const sql = "SELECT * FROM FinancialActivities where month =?"
  const parameters = [month]
  return await connection.executeWithParameters(sql, parameters);
}

async function getFinancialActivitiesByYear(year) {
  const sql = "SELECT * FROM FinancialActivities where year =?"
  const parameters = [year]
  return await connection.executeWithParameters(sql, parameters);
}

async function getFinancialActivitiesByMonthAndYear(month, year) {
  const sql = "SELECT * FROM FinancialActivities where month=? and year =?"
  const parameters = [month, year]
  return await connection.executeWithParameters(sql, parameters);
}

module.exports = {
  addFinancialActivities,
  getAllFinancialActivities,
  getFinancialActivitiesByMonth,
  getFinancialActivitiesByYear,
  getFinancialActivitiesByMonthAndYear,


};
