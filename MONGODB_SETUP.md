# MongoDB Authentication Setup Guide

This guide will help you set up the authentication system using MongoDB instead of PostgreSQL.

## 📋 Prerequisites

- Node.js 18+ installed
- MongoDB database (local or MongoDB Atlas)
- npm or yarn package manager

## 🗄️ Database Setup

### Option 1: MongoDB Atlas (Cloud - Recommended)

1. **Create MongoDB Atlas Account**
   - Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for a free account

2. **Create a Cluster**
   - Click "Build a Database"
   - Choose "FREE" tier (M0)
   - Select your preferred cloud provider and region
   - Click "Create"

3. **Create Database User**
   - Go to "Database Access" → "Add New Database User"
   - Choose "Password" authentication
   - Create username and password (save these!)
   - Set privileges to "Atlas admin" or "Read and write to any database"
   - Click "Add User"

4. **Whitelist IP Address**
   - Go to "Network Access" → "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Or add your specific IP address
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with your database name (e.g., `delhi_tyre_shoppee`)

### Option 2: Local MongoDB

1. **Install MongoDB**
   - **Windows**: Download from [mongodb.com/download](https://www.mongodb.com/try/download/community)
   - **macOS**: `brew install mongodb-community`
   - **Linux**: `sudo apt-get install mongodb`

2. **Start MongoDB**
   ```bash
   # Windows (as a service, usually auto-starts)
   # Or manually:
   mongod
   
   # macOS/Linux
   brew services start mongodb-community
   # or
   sudo systemctl start mongod
   ```

3. **Connection String**
   ```
   mongodb://localhost:27017/delhi_tyre_shoppee
   ```

## 🔧 Environment Variables

Create or update your `.env` file:

```env
# MongoDB Connection
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/delhi_tyre_shoppee?retryWrites=true&w=majority"

# For local MongoDB:
# DATABASE_URL="mongodb://localhost:27017/delhi_tyre_shoppee"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here-generate-with-openssl-rand-base64-32"

# Email (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_EMAIL=info@delhityreshoppe.com
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

## 📦 Installation Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Generate Prisma Client

```bash
npm run db:generate
```

### 3. Push Schema to Database

```bash
npm run db:push
```

This will create the collections in MongoDB:
- `users`
- `sessions`
- `activity_logs`

### 4. Create First Admin User

**Option A: Using Prisma Studio**
```bash
npm run db:studio
```
- Navigate to `users` collection
- Click "Add record"
- Fill in the form (password will be hashed automatically)
- Set role to `ADMIN`

**Option B: Using API**
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@example.com",
    "password": "admin123",
    "role": "ADMIN"
  }'
```

**Option C: Create Script**
Create `scripts/createAdmin.ts`:
```typescript
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 12)
  
  const admin = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@delhityreshoppe.com',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })
  
  console.log('Admin user created:', admin)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
```

Run with:
```bash
npx ts-node scripts/createAdmin.ts
```

## 🚀 Running the Application

### Development Mode

```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000 (if running Express server)

## 🔍 Verify MongoDB Connection

### Using MongoDB Compass (GUI Tool)

1. Download [MongoDB Compass](https://www.mongodb.com/products/compass)
2. Connect using your connection string
3. Browse your database and collections

### Using MongoDB Shell

```bash
mongosh "your-connection-string"
```

Then:
```javascript
use delhi_tyre_shoppee
show collections
db.users.find()
```

## 📊 Database Structure

### Collections Created

1. **users**
   - `_id` (ObjectId)
   - `name` (String)
   - `email` (String, unique)
   - `phone` (String, optional)
   - `password` (String, hashed)
   - `role` (Enum: ADMIN, MANAGER, STAFF)
   - `isActive` (Boolean)
   - `createdAt` (DateTime)
   - `updatedAt` (DateTime)

2. **sessions**
   - `_id` (ObjectId)
   - `sessionToken` (String, unique)
   - `userId` (ObjectId, reference to users)
   - `expires` (DateTime)

3. **activity_logs**
   - `_id` (ObjectId)
   - `userId` (ObjectId, reference to users)
   - `action` (String)
   - `details` (String, optional)
   - `ipAddress` (String, optional)
   - `userAgent` (String, optional)
   - `createdAt` (DateTime)

## 🔐 Authentication Flow

1. User signs up → User document created in `users` collection
2. User logs in → Session created in `sessions` collection
3. Activity logged → Entry created in `activity_logs` collection

## 🛠️ Troubleshooting

### Connection Issues

1. **Check MongoDB is running**
   ```bash
   # Local
   mongosh
   
   # Atlas - Check cluster status in dashboard
   ```

2. **Verify connection string**
   - Check username/password
   - Check database name
   - Check IP whitelist (for Atlas)

3. **Check Prisma connection**
   ```bash
   npx prisma db pull
   ```

### Prisma Client Issues

1. **Regenerate client**
   ```bash
   npm run db:generate
   ```

2. **Clear Prisma cache**
   ```bash
   rm -rf node_modules/.prisma
   npm run db:generate
   ```

### NextAuth Issues

1. **Check NEXTAUTH_SECRET is set**
2. **Verify NEXTAUTH_URL matches your domain**
3. **Check browser console for errors**

## 📝 Differences from PostgreSQL

### MongoDB-Specific Features

1. **ObjectId instead of CUID**
   - MongoDB uses `@default(auto())` with `@db.ObjectId`
   - IDs are ObjectId type, not strings

2. **No Foreign Key Constraints**
   - MongoDB doesn't enforce foreign keys
   - Relations are maintained by Prisma

3. **No Transactions (in some cases)**
   - MongoDB supports transactions, but simpler operations don't need them

4. **Schema Flexibility**
   - MongoDB is schema-less, but Prisma enforces schema

## 🚀 Production Deployment

### MongoDB Atlas (Recommended)

1. Create production cluster
2. Set up proper IP whitelist
3. Use connection string with credentials
4. Enable backup and monitoring

### Environment Variables

Set in your hosting platform:
- `DATABASE_URL` - MongoDB Atlas connection string
- `NEXTAUTH_URL` - Your production domain
- `NEXTAUTH_SECRET` - Strong random secret

### Security Best Practices

1. **Use MongoDB Atlas** (managed, secure)
2. **Enable authentication** (always)
3. **Whitelist IP addresses** (production)
4. **Use strong passwords**
5. **Enable SSL/TLS** (Atlas does this by default)
6. **Regular backups**
7. **Monitor access logs**

## ✅ Verification Checklist

- [ ] MongoDB installed/running or Atlas cluster created
- [ ] Connection string in `.env`
- [ ] Prisma client generated
- [ ] Schema pushed to database
- [ ] Admin user created
- [ ] Can login with admin credentials
- [ ] Sessions working
- [ ] Activity logs recording

## 📚 Additional Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Prisma MongoDB Guide](https://www.prisma.io/docs/concepts/database-connectors/mongodb)
- [NextAuth MongoDB Adapter](https://next-auth.js.org/adapters/prisma)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

---

**Need Help?** Check the main README.md or open an issue.

