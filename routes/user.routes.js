module.exports = function (app) {
  var location = require("../controllers/user.controller.js");

  // crate users
  app.post("/api/users", location.create);
  // get all users
  app.get("/api/users", location.findAll);
  // get user by id
  app.get("/api/users/:userId", location.findOne);
  // update user by id
  app.put("/api/users/:userId", location.update);
  // delete user by id
  app.delete("/api/users/:userId", location.delete);
  // create account
  app.post("/api/users/:userId/accounts", location.createAccount);
  // get all accounts for a user
  app.get("/api/users/:userId/accounts", location.findAllAccounts);
  // add a transaction
  app.post(
    "/api/users/:userId/accounts/:accountId/transactions",
    location.createTransaction
  );
  // get all transactions for an account
  app.get(
    "/api/users/:userId/accounts/:accountId/transactions",
    location.findAllTransactions
  );
};
