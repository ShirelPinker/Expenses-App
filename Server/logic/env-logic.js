const databaseConnection = require("../dal/connection-wrapper")

async function setEnv(isProdEnv) {
  if(isProdEnv==="true"){
    process.env.NODE_ENV = "production"
  }else{
    process.env.NODE_ENV = "dev"
  }
  loadEnvParams();
  await databaseConnection.closeConnection();
  databaseConnection.connection.connect()
}


function loadEnvParams() {
  if (process.env.NODE_ENV === "production") {
    process.env.DB_NAME = "expenses_db"
    // require('dotenv').config({path: process.cwd() + '/environmentVariables/prod.env'})
  } else {
    process.env.DB_NAME = "dev_expenses_db"

    // require('dotenv').config({path: process.cwd() + '/environmentVariables/dev.env'})
  }
}


  module.exports = {
    setEnv,
  };
