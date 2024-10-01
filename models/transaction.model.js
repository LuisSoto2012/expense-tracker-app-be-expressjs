class Transaction {
  constructor(amount, date, categoryId, description, type, updatedAt = null) {
    this.amount = amount;
    this.date = new Date(date);
    this.categoryId = categoryId; // Reference to Category document
    this.description = description;
    this.type = type; // "Income" or "Expense"
    this.createdAt = new Date().toISOString();
    this.updatedAt = updatedAt;
  }

  toFirestore() {
    return {
      amount: this.amount,
      date: this.date.toISOString(),
      categoryId: this.categoryId,
      description: this.description,
      type: this.type,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  static fromFirestore(data) {
    const {
      amount,
      date,
      categoryId,
      description,
      type,
      createdAt,
      updatedAt,
    } = data;
    const transaction = new Transaction(
      amount,
      date,
      categoryId,
      description,
      type,
      updatedAt
    );
    transaction.createdAt = createdAt;
    return transaction;
  }
}

module.exports = Transaction;
