# 🚀 Quick Start Guide - Get Running in 5 Minutes

## Step 1: MongoDB Atlas Setup (2 minutes)

1. **Sign up**: [mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register)
2. **Create cluster**: Click "Build a Database" → Choose FREE tier → Create
3. **Create user**: 
   - Database Access → Add User
   - Username: `delhityreshoppe`
   - Password: Click "Autogenerate" → **SAVE THE PASSWORD**
   - Role: Atlas admin
4. **Whitelist IP**: Network Access → Add IP → Allow from anywhere
5. **Get connection string**:
   - Database → Connect → Connect your application
   - Copy the string
   - Replace `<username>` and `<password>`
   - Add database name: `...mongodb.net/delhi_tyre_shoppee?...`

## Step 2: Environment Setup (1 minute)

Create `.env` file in root:

```env
DATABASE_URL="mongodb+srv://delhityreshoppe:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/delhi_tyre_shoppee?retryWrites=true&w=majority"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="run: node -e \"console.log(require('crypto').randomBytes(32).toString('base64'))\""
```

Generate secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## Step 3: Install & Setup (1 minute)

```bash
# Install dependencies
npm install

# Generate Prisma Client
npm run db:generate

# Push schema to MongoDB
npm run db:push
```

## Step 4: Create Admin User (30 seconds)

```bash
npm run create:admin
```

Or use Prisma Studio:
```bash
npm run db:studio
# Then create user manually with hashed password
```

## Step 5: Start & Test (30 seconds)

```bash
npm run dev
```

Open: http://localhost:3000

**Login:**
- Email: `admin@delhityreshoppe.com`
- Password: `admin123`

---

## ✅ Done!

You should now be able to:
- ✅ Login with admin credentials
- ✅ See admin dashboard at `/ims/admin/dashboard`
- ✅ Create new users via signup
- ✅ All authentication working

---

## 🔧 Common Issues

**"MongoDB connection error"**
→ Check connection string, password encoding, IP whitelist

**"Prisma Client not found"**
→ Run `npm run db:generate`

**"Invalid credentials"**
→ Verify user exists in MongoDB, password is hashed correctly

---

For detailed setup, see `COMPLETE_SETUP_GUIDE.md`

