const admin = require("firebase-admin");
const db = admin.firestore();
const User = require("../models/user.model");
const Account = require("../models/account.model");
const Transaction = require("../models/transaction.model");
const Category = require("../models/category.model");

// Create and Save a new User
exports.create = async (req, res) => {
  try {
    const { firstName, lastName, email, currency, settings } = req.body;
    const user = new User(firstName, lastName, email, currency, settings);
    const docRef = await db.collection("users").add(user.toFirestore());
    res.status(201).send({ id: docRef.id, ...user });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while creating the User.",
    });
  }
};

// Retrieve all Users
exports.findAll = async (req, res) => {
  try {
    const snapshot = await db.collection("users").get();
    const users = [];
    snapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });
    res.send(users);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving users.",
    });
  }
};

// Find a single User with an id
exports.findOne = async (req, res) => {
  try {
    const doc = await db.collection("users").doc(req.params.userId).get();
    if (!doc.exists) {
      res.status(404).send({ message: "User not found" });
    } else {
      res.send({ id: doc.id, ...doc.data() });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error retrieving User with id=" + req.params.userId });
  }
};

// Update a User by the id in the request
exports.update = async (req, res) => {
  try {
    const user = new User(
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      req.body.currency,
      req.body.settings
    );
    await db
      .collection("users")
      .doc(req.params.userId)
      .update(user.toFirestore());
    res.send({ message: "User was updated successfully." });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error updating User with id=" + req.params.userId });
  }
};

// Delete a User with the specified id in the request
exports.delete = async (req, res) => {
  try {
    await db.collection("users").doc(req.params.userId).delete();
    res.send({ message: "User was deleted successfully!" });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Could not delete User with id=" + req.params.userId });
  }
};

// Create a new Account for a User
exports.createAccount = async (req, res) => {
  try {
    const { name, type, initialBalance, currency } = req.body;
    const account = new Account(name, type, initialBalance, currency);
    const docRef = await db
      .collection("users")
      .doc(req.params.userId)
      .collection("accounts")
      .add(account.toFirestore());
    res.status(201).send({ id: docRef.id, ...account });
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while creating the Account.",
    });
  }
};

// Retrieve all Accounts for a User
exports.findAllAccounts = async (req, res) => {
  try {
    const snapshot = await db
      .collection("users")
      .doc(req.params.userId)
      .collection("accounts")
      .get();
    const accounts = [];
    snapshot.forEach((doc) => {
      accounts.push({ id: doc.id, ...doc.data() });
    });
    res.send(accounts);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while retrieving accounts.",
    });
  }
};

// Create a new Transaction for an Account
exports.createTransaction = async (req, res) => {
  try {
    const { amount, date, categoryId, description, type } = req.body;
    const transaction = new Transaction(
      amount,
      date,
      categoryId,
      description,
      type
    );
    const docRef = await db
      .collection("users")
      .doc(req.params.userId)
      .collection("accounts")
      .doc(req.params.accountId)
      .collection("transactions")
      .add(transaction.toFirestore());
    res.status(201).send({ id: docRef.id, ...transaction });
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while creating the Transaction.",
    });
  }
};

// Retrieve all Transactions for an Account
exports.findAllTransactions = async (req, res) => {
  try {
    const snapshot = await db
      .collection("users")
      .doc(req.params.userId)
      .collection("accounts")
      .doc(req.params.accountId)
      .collection("transactions")
      .get();
    const transactions = [];
    snapshot.forEach((doc) => {
      transactions.push({ id: doc.id, ...doc.data() });
    });
    res.send(transactions);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while retrieving transactions.",
    });
  }
};
