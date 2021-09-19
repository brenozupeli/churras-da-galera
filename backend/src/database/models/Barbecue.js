const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    ownerId: String,
    date: Date,
    description: String,
    participants: [{ name: String, value: Number, paid: Boolean }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('barbecue', schema);
