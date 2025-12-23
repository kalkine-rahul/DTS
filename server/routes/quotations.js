const express = require('express')
const router = express.Router()
const Quotation = require('../models/Quotation')

// Get all quotations
router.get('/', async (req, res) => {
  try {
    const { status } = req.query
    const query = status ? { status } : {}
    const quotations = await Quotation.find(query)
      .populate('items.product')
      .sort({ createdAt: -1 })
    res.json(quotations)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get single quotation
router.get('/:id', async (req, res) => {
  try {
    const quotation = await Quotation.findById(req.params.id)
      .populate('items.product')
    if (!quotation) {
      return res.status(404).json({ error: 'Quotation not found' })
    }
    res.json(quotation)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Create quotation
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

    const quotation = new Quotation(req.body)
    await quotation.save()
    const populated = await Quotation.findById(quotation._id)
      .populate('items.product')
    res.status(201).json(populated)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Update quotation
router.put('/:id', async (req, res) => {
  try {
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

    const quotation = await Quotation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('items.product')

    if (!quotation) {
      return res.status(404).json({ error: 'Quotation not found' })
    }
    res.json(quotation)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Delete quotation
router.delete('/:id', async (req, res) => {
  try {
    const quotation = await Quotation.findByIdAndDelete(req.params.id)
    if (!quotation) {
      return res.status(404).json({ error: 'Quotation not found' })
    }
    res.json({ message: 'Quotation deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router

