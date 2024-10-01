const admin = require("firebase-admin");
const db = admin.firestore();
const Transaction = require("../models/transaction.model");
const Category = require("../models/category.model");

// Create and Save a new Transaction
exports.create = async (req, res) => {
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

// Retrieve all Transactions with category name
exports.findAll = async (req, res) => {
  try {
    const snapshot = await db.collection("transactions").get();
    const transactions = [];
    for (const doc of snapshot.docs) {
      const transactionData = Transaction.fromFirestore(doc.data());
      const categoryDoc = await db
        .collection("categories")
        .doc(transactionData.categoryId)
        .get();
      if (!categoryDoc.exists) {
        transactions.push({
          id: doc.id,
          ...transactionData,
          categoryName: "Category not found",
        });
      } else {
        const category = Category.fromFirestore(categoryDoc.data());
        transactions.push({
          id: doc.id,
          ...transactionData,
          categoryName: category.name,
        });
        console.log(transactions);
      }
    }

    res.send(transactions);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while retrieving transactions.",
    });
  }
};

// Find a single Transaction with an id and category name
exports.findOne = async (req, res) => {
  try {
    const doc = await db
      .collection("transactions")
      .doc(req.params.transactionId)
      .get();
    if (!doc.exists) {
      res.status(404).send({ message: "Transaction not found" });
    } else {
      const transactionData = Transaction.fromFirestore(doc.data());
      const categoryDoc = await db
        .collection("categories")
        .doc(transactionData.categoryId)
        .get();
      if (!categoryDoc.exists) {
        res.send({
          id: doc.id,
          ...transactionData,
          categoryName: "Category not found",
        });
      } else {
        const category = Category.fromFirestore(categoryDoc.data());
        res.send({
          id: doc.id,
          ...transactionData,
          categoryName: category.name,
        });
      }
    }
  } catch (error) {
    res.status(500).send({
      message:
        "Error retrieving Transaction with id=" + req.params.transactionId,
    });
  }
};

// Update a Transaction by the id in the request
exports.update = async (req, res) => {
  try {
    const transaction = new Transaction(
      req.body.amount,
      req.body.date,
      req.body.categoryId,
      req.body.description,
      req.body.type,
      new Date().toISOString()
    );
    await db
      .collection("transactions")
      .doc(req.params.transactionId)
      .update(transaction.toFirestore());
    const categoryDoc = await db
      .collection("categories")
      .doc(transaction.categoryId)
      .get();
    if (!categoryDoc.exists) {
      res.status(404).send({
        message:
          "Transaction was updated successfully, but category not found.",
        transaction: { id: req.params.transactionId, ...transaction },
      });
    } else {
      const category = Category.fromFirestore(categoryDoc.data());
      res.status(200).send({
        message: "Transaction was updated successfully.",
        transaction: {
          id: req.params.transactionId,
          ...transaction,
          categoryName: category.name,
        },
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error updating Transaction with id=" + req.params.transactionId,
    });
  }
};

// Delete a Transaction with the specified id in the request
exports.delete = async (req, res) => {
  try {
    await db.collection("transactions").doc(req.params.transactionId).delete();
    res.send({ message: "Transaction was deleted successfully!" });
  } catch (error) {
    res.status(500).send({
      message:
        "Could not delete Transaction with id=" + req.params.transactionId,
    });
  }
};
