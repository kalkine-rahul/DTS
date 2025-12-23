const express = require('express')
const router = express.Router()
const Location = require('../models/Location')

// Get all locations
router.get('/', async (req, res) => {
  try {
    const locations = await Location.find({ isActive: true }).sort({ name: 1 })
    res.json(locations)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get single location
router.get('/:id', async (req, res) => {
  try {
    const location = await Location.findById(req.params.id)
    if (!location) {
      return res.status(404).json({ error: 'Location not found' })
    }
    res.json(location)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Create location
router.post('/', async (req, res) => {
  try {
    const location = new Location(req.body)
    await location.save()
    res.status(201).json(location)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Update location
router.put('/:id', async (req, res) => {
  try {
    const location = await Location.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!location) {
      return res.status(404).json({ error: 'Location not found' })
    }
    res.json(location)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Delete location (soft delete)
router.delete('/:id', async (req, res) => {
  try {
    const location = await Location.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    )
    if (!location) {
      return res.status(404).json({ error: 'Location not found' })
    }
    res.json({ message: 'Location deactivated successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router

