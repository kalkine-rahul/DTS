const mongoose = require('mongoose')

const invoiceItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  unitPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  discount: {
    type: Number,
    default: 0,
    min: 0,
  },
  total: {
    type: Number,
    required: true,
    min: 0,
  },
})

const invoiceSchema = new mongoose.Schema({
  invoiceNumber: {
    type: String,
    required: true,
    unique: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  customerPhone: {
    type: String,
    required: true,
  },
  customerEmail: {
    type: String,
  },
  customerAddress: {
    type: String,
  },
  items: [invoiceItemSchema],
  subtotal: {
    type: Number,
    required: true,
    min: 0,
  },
  tax: {
    type: Number,
    default: 0,
    min: 0,
  },
  discount: {
    type: Number,
    default: 0,
    min: 0,
  },
  total: {
    type: Number,
    required: true,
    min: 0,
  },
  status: {
    type: String,
    enum: ['draft', 'pending', 'paid', 'cancelled'],
    default: 'draft',
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'card', 'upi', 'bank_transfer', 'credit'],
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
    required: true,
  },
  quotation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quotation',
  },
  notes: {
    type: String,
  },
  createdBy: {
    type: String,
    default: 'System',
  },
}, {
  timestamps: true,
})

// Auto-generate invoice number
invoiceSchema.pre('save', async function(next) {
  if (!this.invoiceNumber) {
    const count = await mongoose.model('Invoice').countDocuments()
    this.invoiceNumber = `INV-${Date.now()}-${count + 1}`
  }
  next()
})

// Middleware to update stock when invoice is created/updated
invoiceSchema.post('save', async function(doc) {
  if (doc.status === 'paid' || doc.status === 'pending') {
    const Stock = mongoose.model('Stock')
    for (const item of doc.items) {
      await Stock.findOneAndUpdate(
        { product: item.product, location: doc.location },
        { $inc: { quantity: -item.quantity } },
        { upsert: false }
      )
    }
  }
})

module.exports = mongoose.model('Invoice', invoiceSchema)

