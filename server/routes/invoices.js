const express = require('express')
const router = express.Router()
const Invoice = require('../models/Invoice')
const Stock = require('../models/Stock')

// Get all invoices
router.get('/', async (req, res) => {
  try {
    const { status, startDate, endDate } = req.query
    const query = {}
    if (status) query.status = status
    if (startDate || endDate) {
      query.createdAt = {}
      if (startDate) query.createdAt.$gte = new Date(startDate)
      if (endDate) query.createdAt.$lte = new Date(endDate)
    }

    const invoices = await Invoice.find(query)
      .populate('items.product')
      .populate('location')
      .populate('quotation')
      .sort({ createdAt: -1 })
    res.json(invoices)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get single invoice
router.get('/:id', async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id)
      .populate('items.product')
      .populate('location')
      .populate('quotation')
    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' })
    }
    res.json(invoice)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Create invoice
router.post('/', async (req, res) => {
  try {
    // Calculate totals
    let subtotal = 0
    req.body.items.forEach(item => {
      item.total = (item.unitPrice * item.quantity) - (item.discount || 0)
      subtotal += item.total
    })

    req.body.subtotal = subtotal
    req.body.total = subtotal + (req.body.tax || 0) - (req.body.discount || 0)

    const invoice = new Invoice(req.body)
    await invoice.save()

    // Update stock if invoice is paid or pending
    if (invoice.status === 'paid' || invoice.status === 'pending') {
      for (const item of invoice.items) {
        await Stock.findOneAndUpdate(
          { product: item.product, location: invoice.location },
          { $inc: { quantity: -item.quantity }, lastUpdated: new Date() },
          { upsert: false }
        )
      }
    }

    const populated = await Invoice.findById(invoice._id)
      .populate('items.product')
      .populate('location')
      .populate('quotation')
    res.status(201).json(populated)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Update invoice
router.put('/:id', async (req, res) => {
  try {
    const oldInvoice = await Invoice.findById(req.params.id)
    
    // Recalculate totals if items changed
    if (req.body.items) {
      let subtotal = 0
      req.body.items.forEach(item => {
        item.total = (item.unitPrice * item.quantity) - (item.discount || 0)
        subtotal += item.total
      })
      req.body.subtotal = subtotal
      req.body.total = subtotal + (req.body.tax || 0) - (req.body.discount || 0)
    }

    const invoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('items.product').populate('location').populate('quotation')

    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' })
    }

    // Update stock if status changed to paid
    if (oldInvoice.status !== 'paid' && invoice.status === 'paid') {
      for (const item of invoice.items) {
        await Stock.findOneAndUpdate(
          { product: item.product, location: invoice.location },
          { $inc: { quantity: -item.quantity }, lastUpdated: new Date() },
          { upsert: false }
        )
      }
    }

    res.json(invoice)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Delete invoice
router.delete('/:id', async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndDelete(req.params.id)
    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' })
    }
    res.json({ message: 'Invoice deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router

