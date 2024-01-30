const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

connection.connect(err => {
  if (err) {
    console.log("failed to create connection" + err);
    return;
  }
  console.log("We're conncted to MySQL")
});


// One function for executing select / insert / update / delete:
function execute(sql) {
  return new Promise((resolve, reject) => {
    connection.execute(sql, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
}

function executeWithParameters(sql, parameters) {
  return new Promise((resolve, reject) => {
    connection.execute(sql, parameters, (err, result) => {
      if (err) {
        console.log("Failed interacting with DB, calling reject");
        reject(err);
        return;
      }
      resolve(result);
    });
  });
}

function closeConnection() {
  if (connection) {
    connection.end(err => {
      if (err) {
        console.log("Failed to close connection: " + err);
      } else {
        console.log("Connection closed");
      }
    });
  }
}

module.exports = {
  execute,
  executeWithParameters,
  closeConnection,
  connection
};
