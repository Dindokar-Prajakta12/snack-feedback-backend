require('dotenv').config();
const connectDB = require('../config/db');
const User = require('../models/User');

async function seed() {
  try {
    await connectDB(process.env.MONGO_URI || 'mongodb://localhost:27017/mern_snack');
    const username = process.env.SEED_USERNAME || 'admin';
    const password = process.env.SEED_PASSWORD || 'admin123';
    const existing = await User.findOne({ username });
    if (existing) {
      console.log('Seed user already exists:', username);
      process.exit(0);
    }
    const u = new User({ username, password });
    await u.save();
    console.log('Seeded user:', username, 'password:', password);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
