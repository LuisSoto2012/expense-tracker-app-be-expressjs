module.exports = function (app) {
  var transaction = require("../controllers/transaction.controller.js");

  // Create a new Transaction
  app.post("/api/transactions", transaction.create);

  // Retrieve all Transactions
  app.get("/api/transactions", transaction.findAll);

  // Retrieve a single Transaction with id
  app.get("/api/transactions/:transactionId", transaction.findOne);

  // Update a Transaction with id
  app.put("/api/transactions/:transactionId", transaction.update);

  // Delete a Transaction with id
  app.delete("/api/transactions/:transactionId", transaction.delete);
};
