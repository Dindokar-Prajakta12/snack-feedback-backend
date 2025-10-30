const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  age: { type: Number },
  gender: { type: String },
  productVariant: { type: String }, // e.g., Spicy / Salted
  rating: { type: Number, required: true, min: 1, max: 5 },
  comments: { type: String },
  purchaseDate: { type: Date },
  store: { type: String },
  wouldRecommend: { type: Boolean, default: false },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Customer', CustomerSchema);
