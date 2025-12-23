const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const Stock = require('../models/Stock')
const Location = require('../models/Location')

// Get all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find({ isActive: true }).sort({ createdAt: -1 })
    res.json(products)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get single product
router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }
    res.json(product)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Create product
router.post('/products', async (req, res) => {
  try {
    const product = new Product(req.body)
    await product.save()
    res.status(201).json(product)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Update product
router.put('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }
    res.json(product)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Delete product (soft delete)
router.delete('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    )
    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }
    res.json({ message: 'Product deactivated successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get stock by location
router.get('/stock', async (req, res) => {
  try {
    const { locationId, productId } = req.query
    const query = {}
    if (locationId) query.location = locationId
    if (productId) query.product = productId

    const stock = await Stock.find(query)
      .populate('product')
      .populate('location')
      .sort({ lastUpdated: -1 })
    res.json(stock)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get stock summary (all locations)
router.get('/stock/summary', async (req, res) => {
  try {
    const stock = await Stock.aggregate([
      {
        $group: {
          _id: '$product',
          totalQuantity: { $sum: '$quantity' },
          totalReserved: { $sum: '$reservedQuantity' },
          locations: { $push: { location: '$location', quantity: '$quantity' } }
        }
      },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'product'
        }
      },
      { $unwind: '$product' }
    ])
    res.json(stock)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update stock
router.post('/stock', async (req, res) => {
  try {
    const { productId, locationId, quantity, operation } = req.body

    const stock = await Stock.findOneAndUpdate(
      { product: productId, location: locationId },
      {
        $inc: { quantity: operation === 'add' ? quantity : -quantity },
        lastUpdated: new Date()
      },
      { upsert: true, new: true }
    ).populate('product').populate('location')

    res.json(stock)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Get low stock items
router.get('/stock/low', async (req, res) => {
  try {
    const stock = await Stock.find({
      $expr: { $lte: ['$quantity', '$minStockLevel'] }
    })
      .populate('product')
      .populate('location')
    res.json(stock)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Locations
router.get('/locations', async (req, res) => {
  try {
    const locations = await Location.find({ isActive: true }).sort({ name: 1 })
    res.json(locations)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post('/locations', async (req, res) => {
  try {
    const location = new Location(req.body)
    await location.save()
    res.status(201).json(location)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

module.exports = router

