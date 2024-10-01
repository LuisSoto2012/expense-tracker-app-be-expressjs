const admin = require("firebase-admin");
const db = admin.firestore();

class User {
  constructor(firstName, lastName, email, currency, settings) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.currency = currency;
    this.settings = settings;
    this.createdAt = new Date().toISOString();
  }

  toFirestore() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      currency: this.currency,
      settings: this.settings,
      createdAt: this.createdAt,
    };
  }

  static fromFirestore(data) {
    const { firstName, lastName, email, currency, settings, createdAt } = data;
    const user = new User(firstName, lastName, email, currency, settings);
    user.createdAt = createdAt;
    return user;
  }
}

module.exports = User;
