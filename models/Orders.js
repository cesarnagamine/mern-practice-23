const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ordersSchema = new Schema({
  username: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: Date, required: true },
}, {
  timestamps: true,
});

const Orders = mongoose.model('Orders', ordersSchema);

module.exports = Orders;