const categoriesLogic = require("../logic/categories-logic");
const express = require("express");
const router = express.Router();

router.get("/", async (request, response, next) => {
  try {
    const categories = await categoriesLogic.getAllCategories();
    response.json(categories)
  } catch (e) {
    next(e)
  }
});

router.post("/", async (request, response, next) => {
  const newCategory = request.body;

  try {
    await categoriesLogic.addCategory(newCategory);
    response.json();
  } catch (e) {
    next(e)
  }
});

router.put("/", async (request, response, next) => {
  const updatedCategory = request.body;

  try {
    await categoriesLogic.editCategory(updatedCategory);
    response.json();
  } catch (e) {
    next(e)
  }
});

router.delete("/:id", async (request, response, next) => {
  const categoryId = request.params.id;
  try {
    await categoriesLogic.deleteCategory(categoryId);
    response.json()
  } catch (e) {
    next(e)
  }
});


module.exports = router;
