module.exports = function (app) {
  var category = require("../controllers/category.controller.js");

  // Create a new Category
  app.post("/api/categories", category.create);

  // Retrieve all Categories
  app.get("/api/categories", category.findAll);

  // Retrieve a single Category with id
  app.get("/api/categories/:categoryId", category.findOne);

  // Retrieve Categories by type
  app.get("/api/categories/type/:type", category.findByType);

  // Update a Category with id
  app.put("/api/categories/:categoryId", category.update);

  // Delete a Category with id
  app.delete("/api/categories/:categoryId", category.delete);
};
