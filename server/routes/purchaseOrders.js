const express = require('express')
const router = express.Router()
const PurchaseOrder = require('../models/PurchaseOrder')
const Stock = require('../models/Stock')

// Get all purchase orders
router.get('/', async (req, res) => {
  try {
    const { status } = req.query
    const query = status ? { status } : {}
    const orders = await PurchaseOrder.find(query)
      .populate('items.product')
      .populate('location')
      .sort({ createdAt: -1 })
    res.json(orders)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get single purchase order
router.get('/:id', async (req, res) => {
  try {
    const order = await PurchaseOrder.findById(req.params.id)
      .populate('items.product')
      .populate('location')
    if (!order) {
      return res.status(404).json({ error: 'Purchase order not found' })
    }
    res.json(order)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Create purchase order
router.post('/', async (req, res) => {
  try {
    // Calculate totals
    let subtotal = 0
    req.body.items.forEach(item => {
      item.total = item.unitCost * item.quantity
      subtotal += item.total
    })

    req.body.subtotal = subtotal
    req.body.total = subtotal + (req.body.tax || 0) + (req.body.shippingCost || 0)

    const order = new PurchaseOrder(req.body)
    await order.save()
    const populated = await PurchaseOrder.findById(order._id)
      .populate('items.product')
      .populate('location')
    res.status(201).json(populated)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Update purchase order
router.put('/:id', async (req, res) => {
  try {
    // Recalculate totals if items changed
    if (req.body.items) {
      let subtotal = 0
      req.body.items.forEach(item => {
        item.total = item.unitCost * item.quantity
        subtotal += item.total
      })
      req.body.subtotal = subtotal
      req.body.total = subtotal + (req.body.tax || 0) + (req.body.shippingCost || 0)
    }

    const order = await PurchaseOrder.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('items.product').populate('location')

    if (!order) {
      return res.status(404).json({ error: 'Purchase order not found' })
    }
    res.json(order)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Receive purchase order (update stock)
router.post('/:id/receive', async (req, res) => {
  try {
    const order = await PurchaseOrder.findById(req.params.id)
    if (!order) {
      return res.status(404).json({ error: 'Purchase order not found' })
    }

    const { items } = req.body // Array of { productId, receivedQuantity }

    for (const item of items) {
      const orderItem = order.items.id(item.productId)
      if (orderItem) {
        orderItem.receivedQuantity = item.receivedQuantity

        // Update stock
        await Stock.findOneAndUpdate(
          { product: item.productId, location: order.location },
          { $inc: { quantity: item.receivedQuantity }, lastUpdated: new Date() },
          { upsert: true }
        )
      }
    }

    // Update order status
    const totalOrdered = order.items.reduce((sum, item) => sum + item.quantity, 0)
    const totalReceived = order.items.reduce((sum, item) => sum + item.receivedQuantity, 0)

    if (totalReceived === 0) {
      order.status = 'pending'
    } else if (totalReceived < totalOrdered) {
      order.status = 'partially_received'
    } else {
      order.status = 'received'
      order.receivedDate = new Date()
    }

    await order.save()
    const populated = await PurchaseOrder.findById(order._id)
      .populate('items.product')
      .populate('location')
    res.json(populated)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Delete purchase order
router.delete('/:id', async (req, res) => {
  try {
    const order = await PurchaseOrder.findByIdAndDelete(req.params.id)
    if (!order) {
      return res.status(404).json({ error: 'Purchase order not found' })
    }
    res.json({ message: 'Purchase order deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router

