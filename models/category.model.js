class Category {
  constructor(name, type) {
    this.name = name;
    this.type = type; // "Income" or "Expense"
    this.createdAt = new Date().toISOString();
  }

  toFirestore() {
    return {
      name: this.name,
      type: this.type,
      createdAt: this.createdAt,
    };
  }

  static fromFirestore(data) {
    const { name, type, createdAt } = data;
    const category = new Category(name, type);
    category.createdAt = createdAt;
    return category;
  }
}

module.exports = Category;
