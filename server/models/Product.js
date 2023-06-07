const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  story: {
    type: String
  },
  price: {
    type: Number,
    required: true,
    min: 0.99
  },
  quantity: {
    type: Number,
    min: 0,
    default: 0
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  // paywall property with a boolean to determine if the story property is locked or unlocked for the products, (not purchased or purchased)
  paywall: {
    type: Boolean,
    default: true
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;