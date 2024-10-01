class Account {
  constructor(name, type, initialBalance, currency) {
    this.name = name;
    this.type = type; // e.g., "Savings", "Credit Card", etc.
    this.initialBalance = initialBalance;
    this.currency = currency;
    this.createdAt = new Date().toISOString();
  }

  toFirestore() {
    return {
      name: this.name,
      type: this.type,
      initialBalance: this.initialBalance,
      currency: this.currency,
      createdAt: this.createdAt,
    };
  }

  static fromFirestore(data) {
    const { name, type, initialBalance, currency, createdAt } = data;
    const account = new Account(name, type, initialBalance, currency);
    account.createdAt = createdAt;
    return account;
  }
}

module.exports = Account;
