const mongoose = require('mongoose')

const stockSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  reservedQuantity: {
    type: Number,
    default: 0,
    min: 0,
  },
  minStockLevel: {
    type: Number,
    default: 0,
    min: 0,
  },
  maxStockLevel: {
    type: Number,
    default: 1000,
    min: 0,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
})

// Compound index to ensure unique product-location combination
stockSchema.index({ product: 1, location: 1 }, { unique: true })

// Virtual for available quantity
stockSchema.virtual('availableQuantity').get(function() {
  return this.quantity - this.reservedQuantity
})

stockSchema.set('toJSON', { virtuals: true })
stockSchema.set('toObject', { virtuals: true })

module.exports = mongoose.model('Stock', stockSchema)

