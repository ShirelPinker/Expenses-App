loadEnvParams();
const express = require('express');
const cors = require("cors");
const expensesController = require("./controllers/expenses-controller");
const categoriesController = require("./controllers/categories-controller");
const savingsController = require("./controllers/savings-controller");



const app = express();
app.use(cors({
  origin: "*", // Replace with the specific origins you want to allow
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization",
}));
app.use(express.json());

app.use("/savings", savingsController);
app.use("/expenses", expensesController);
app.use("/categories", categoriesController);


app.listen(3001, () => {
  console.log(`Server is running on port 3001`);
});

function loadEnvParams() {
  if (process.env.NODE_ENV === "production") {
    console.log('connecting to prod DB!')
    require('dotenv').config({path: process.cwd() + '/environmentVariables/prod.env'})
  } else {
    console.log('connecting to dev DB!')
    require('dotenv').config({path: process.cwd() + '/environmentVariables/dev.env'})
  }
}
