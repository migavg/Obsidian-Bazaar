const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      // paywall feild to store paywall status for product in the order
      paywall: {
        type: Boolean,
        default: true
      }
    }
  ]
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;