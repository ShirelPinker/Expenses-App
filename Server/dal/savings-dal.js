const connection = require("./connection-wrapper");

async function addSavings(newMonthlySavings) {
  const sql = `
    INSERT INTO Savings (year, month, investment_amount, crypto_amount, deposit_amount, income_amount)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const parameters = [
    newMonthlySavings.year,
    newMonthlySavings.month,
    newMonthlySavings.investmentAmount,
    newMonthlySavings.cryptoAmount,
    newMonthlySavings.depositAmount,
    newMonthlySavings.incomeAmount
  ];

  await connection.executeWithParameters(sql, parameters);
}


module.exports = {
  addSavings,
};
