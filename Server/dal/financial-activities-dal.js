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


module.exports = {
  addFinancialActivities,
};
