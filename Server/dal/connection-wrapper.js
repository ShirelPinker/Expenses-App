const mysql = require("mysql2");

// const connection = mysql.createConnection({
//   host: "localhost", // Docker container is running on localhost
//   port: 3307,        // Specify the port mapped to the container
//   user: "root",      // User with root privileges
//   password: "1234",  // Password set in your Docker command
//   database: "expenses_db" // Replace with your database name
// })

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password:process.env.DB_PASSWORD,
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

module.exports = {
  execute,
  executeWithParameters
};
