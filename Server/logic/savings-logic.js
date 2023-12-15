const savingsDal = require("../dal/savings-dal");

async function addSavings(newMonthlySavings) {
  return  await savingsDal.addSavings(newMonthlySavings);
}


module.exports = {
  addSavings

};
