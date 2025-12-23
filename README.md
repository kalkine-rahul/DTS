# Delhi Tyre Shoppe

A modern, responsive, and SEO-optimized website for Delhi Tyre Shoppe - a trusted tyre retailer offering tyres for cars, bikes, SUVs, and commercial vehicles. The website features a bold automotive theme with black, red, and white colors, high-quality tyre images, and smooth navigation. It includes a comprehensive inventory management system similar to BUSY Software.

## 🚀 Features

### Frontend Features
- **Modern Homepage** with hero banner, highlights, testimonials, and quick links
- **Products Page** showcasing tyres for Cars, Bikes, SUVs, and Commercial vehicles
- **Services Page** with detailed service offerings (Wheel Alignment, Balancing, Puncture Repair, etc.)
- **About Us Page** with company history and mission
- **Contact Page** with enquiry form and Google Maps integration
- **WhatsApp Integration** for instant customer support
- **Fully Responsive** mobile-first design
- **SEO Optimized** with meta tags, sitemap, and robots.txt
- **Fast Loading** with optimized images and code splitting

### Backend Features (Inventory Management System)
- **Multi-Location Inventory Management** - Manage stock across multiple warehouses/godowns
- **Product Management** - Add, update, and manage tyre products with SKU tracking
- **Real-Time Stock Visibility** - Track stock levels across all locations
- **Quotations Module** - Create and manage customer quotations
- **Purchase Orders** - Track incoming stock from suppliers
- **Invoices** - Generate invoices with automatic stock deduction
- **Stock Alerts** - Low stock level notifications
- **Location Management** - Manage warehouses, godowns, and stores

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations
- **React Icons** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Nodemailer** - Email functionality

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local or MongoDB Atlas)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd DTS
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # MongoDB
   MONGODB_URI=mongodb://localhost:27017/delhi-tyre-shoppe
   
   # Server
   PORT=5000
   
   # Email (for contact form)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   CONTACT_EMAIL=info@delhityreshoppe.com
   ```

4. **Start the development servers**
   
   For frontend only:
   ```bash
   npm run dev
   ```
   
   For backend only:
   ```bash
   npm run server
   ```
   
   For both (requires `concurrently`):
   ```bash
   npm run dev:all
   ```

5. **Open your browser**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📁 Project Structure

```
DTS/
├── app/                    # Next.js app directory
│   ├── about/             # About Us page
│   ├── contact/           # Contact page
│   ├── products/          # Products page
│   ├── services/          # Services page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── robots.ts          # Robots.txt
│   └── sitemap.ts         # Sitemap
├── components/            # React components
│   ├── AboutContent.tsx
│   ├── BookServiceBanner.tsx
│   ├── ContactForm.tsx
│   ├── ContactInfo.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Highlights.tsx
│   ├── MapEmbed.tsx
│   ├── Navbar.tsx
│   ├── ProductBrands.tsx
│   ├── ProductCategories.tsx
│   ├── QuickLinks.tsx
│   ├── ServicesList.tsx
│   ├── Testimonials.tsx
│   ├── WhatsAppButton.tsx
│   └── WhyChooseUs.tsx
├── server/                # Backend server
│   ├── models/           # MongoDB models
│   │   ├── Invoice.js
│   │   ├── Location.js
│   │   ├── Product.js
│   │   ├── PurchaseOrder.js
│   │   ├── Quotation.js
│   │   └── Stock.js
│   ├── routes/           # API routes
│   │   ├── contact.js
│   │   ├── invoices.js
│   │   ├── inventory.js
│   │   ├── locations.js
│   │   ├── purchaseOrders.js
│   │   └── quotations.js
│   └── index.js          # Server entry point
├── next.config.js        # Next.js configuration
├── tailwind.config.js    # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies
```

## 🔌 API Endpoints

### Inventory Management

#### Products
- `GET /api/inventory/products` - Get all products
- `GET /api/inventory/products/:id` - Get single product
- `POST /api/inventory/products` - Create product
- `PUT /api/inventory/products/:id` - Update product
- `DELETE /api/inventory/products/:id` - Delete product (soft delete)

#### Stock
- `GET /api/inventory/stock` - Get stock by location/product
- `GET /api/inventory/stock/summary` - Get stock summary across all locations
- `GET /api/inventory/stock/low` - Get low stock items
- `POST /api/inventory/stock` - Update stock

#### Locations
- `GET /api/inventory/locations` - Get all locations
- `POST /api/inventory/locations` - Create location

### Quotations
- `GET /api/quotations` - Get all quotations
- `GET /api/quotations/:id` - Get single quotation
- `POST /api/quotations` - Create quotation
- `PUT /api/quotations/:id` - Update quotation
- `DELETE /api/quotations/:id` - Delete quotation

### Purchase Orders
- `GET /api/purchase-orders` - Get all purchase orders
- `GET /api/purchase-orders/:id` - Get single purchase order
- `POST /api/purchase-orders` - Create purchase order
- `PUT /api/purchase-orders/:id` - Update purchase order
- `POST /api/purchase-orders/:id/receive` - Receive purchase order (update stock)
- `DELETE /api/purchase-orders/:id` - Delete purchase order

### Invoices
- `GET /api/invoices` - Get all invoices
- `GET /api/invoices/:id` - Get single invoice
- `POST /api/invoices` - Create invoice (auto-updates stock)
- `PUT /api/invoices/:id` - Update invoice
- `DELETE /api/invoices/:id` - Delete invoice

### Contact
- `POST /api/contact` - Submit contact form (sends email)

## 🎨 Design System

### Colors
- **Primary Black**: `#000000`
- **Primary Red**: `#DC2626`
- **Primary White**: `#FFFFFF`

### Typography
- **Display Font**: Poppins (headings)
- **Body Font**: Inter (body text)

## 📱 Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Push code to GitHub
2. Connect repository to Vercel/Netlify
3. Set environment variables
4. Deploy

### Backend (Heroku/Railway/DigitalOcean)
1. Set up MongoDB Atlas (recommended for production)
2. Configure environment variables
3. Deploy server
4. Update frontend API URLs

## 🔒 Security Considerations

- Use environment variables for sensitive data
- Implement authentication for admin routes
- Add rate limiting for API endpoints
- Use HTTPS in production
- Validate and sanitize user inputs
- Implement CORS properly

## 📝 Environment Variables

Required environment variables:
- `MONGODB_URI` - MongoDB connection string
- `PORT` - Server port (default: 5000)
- `SMTP_HOST` - SMTP server host
- `SMTP_PORT` - SMTP server port
- `SMTP_USER` - SMTP username
- `SMTP_PASS` - SMTP password
- `CONTACT_EMAIL` - Contact form recipient email

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is proprietary software for Delhi Tyre Shoppe.

## 📞 Support

For support, email info@delhityreshoppe.com or contact via WhatsApp.

## 🎯 Future Enhancements

- [ ] Admin dashboard for inventory management
- [ ] User authentication and authorization
- [ ] Online payment integration
- [ ] Order tracking system
- [ ] Customer portal
- [ ] Advanced reporting and analytics
- [ ] Multi-language support
- [ ] Mobile app

---

**Built with ❤️ for Delhi Tyre Shoppe**

