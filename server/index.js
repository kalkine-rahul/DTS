const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Database connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/delhi-tyre-shoppe'

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err))

// Routes
app.use('/api/inventory', require('./routes/inventory'))
app.use('/api/quotations', require('./routes/quotations'))
app.use('/api/purchase-orders', require('./routes/purchaseOrders'))
app.use('/api/invoices', require('./routes/invoices'))
app.use('/api/locations', require('./routes/locations'))
app.use('/api/contact', require('./routes/contact'))

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Delhi Tyre Shoppe API is running' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

