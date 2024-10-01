const admin = require("firebase-admin");
const db = admin.firestore();
const Category = require("../models/category.model");

// Create and Save a new Category
exports.create = async (req, res) => {
  try {
    const { name, type } = req.body;
    const category = new Category(name, type);
    const docRef = await db
      .collection("categories")
      .add(category.toFirestore());
    res.status(201).send({ id: docRef.id, ...category });
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while creating the Category.",
    });
  }
};

// Retrieve all Categories
exports.findAll = async (req, res) => {
  try {
    const snapshot = await db.collection("categories").get();
    const categories = [];
    snapshot.forEach((doc) => {
      categories.push({ id: doc.id, ...Category.fromFirestore(doc.data()) });
    });
    res.send(categories);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while retrieving categories.",
    });
  }
};

// Find a single Category with an id
exports.findOne = async (req, res) => {
  try {
    const doc = await db
      .collection("categories")
      .doc(req.params.categoryId)
      .get();
    if (!doc.exists) {
      res.status(404).send({ message: "Category not found" });
    } else {
      res.send({ id: doc.id, ...Category.fromFirestore(doc.data()) });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error retrieving Category with id=" + req.params.categoryId,
    });
  }
};

// Update a Category by the id in the request
exports.update = async (req, res) => {
  try {
    const category = new Category(req.body.name, req.body.type);
    await db
      .collection("categories")
      .doc(req.params.categoryId)
      .update(category.toFirestore());
    res.send({ message: "Category was updated successfully." });
  } catch (error) {
    res.status(500).send({
      message: "Error updating Category with id=" + req.params.categoryId,
    });
  }
};

// Delete a Category with the specified id in the request
exports.delete = async (req, res) => {
  try {
    await db.collection("categories").doc(req.params.categoryId).delete();
    res.send({ message: "Category was deleted successfully!" });
  } catch (error) {
    res.status(500).send({
      message: "Could not delete Category with id=" + req.params.categoryId,
    });
  }
};

// Find Categories by type
exports.findByType = async (req, res) => {
  try {
    const snapshot = await db
      .collection("categories")
      .where("type", "==", req.params.type)
      .get();
    const categories = [];
    snapshot.forEach((doc) => {
      categories.push({ id: doc.id, ...Category.fromFirestore(doc.data()) });
    });
    res.send(categories);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while retrieving categories.",
    });
  }
};
