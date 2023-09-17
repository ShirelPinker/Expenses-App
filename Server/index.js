const express = require('express');
const cors = require("cors");
const expensesController = require("./controllers/expenses-controller");
const categoriesController = require("./controllers/categories-controller");


const app = express();
app.use(cors({
  origin: "*", // Replace with the specific origins you want to allow
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization",
}));
app.use(express.json());

app.use("/expenses", expensesController);
app.use("/categories", categoriesController);


app.listen(3001, () => {
  console.log(`Server is running on port 3001`);
});
