const mongoose = require('mongoose')

const purchaseOrderItemSchema = new mongoose.Schema({
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
  unitCost: {
    type: Number,
    required: true,
    min: 0,
  },
  receivedQuantity: {
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

const purchaseOrderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true,
  },
  supplierName: {
    type: String,
    required: true,
  },
  supplierContact: {
    type: String,
  },
  items: [purchaseOrderItemSchema],
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
  shippingCost: {
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
    enum: ['draft', 'pending', 'partially_received', 'received', 'cancelled'],
    default: 'draft',
  },
  expectedDeliveryDate: {
    type: Date,
  },
  receivedDate: {
    type: Date,
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
    required: true,
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

// Auto-generate order number
purchaseOrderSchema.pre('save', async function(next) {
  if (!this.orderNumber) {
    const count = await mongoose.model('PurchaseOrder').countDocuments()
    this.orderNumber = `PO-${Date.now()}-${count + 1}`
  }
  next()
})

module.exports = mongoose.model('PurchaseOrder', purchaseOrderSchema)

