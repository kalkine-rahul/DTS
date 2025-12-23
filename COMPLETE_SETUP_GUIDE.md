# Complete Setup Guide - Prisma + MongoDB + NextAuth

This is a complete step-by-step guide to set up your authentication system with Prisma, MongoDB Atlas, and NextAuth.

## 📋 Table of Contents

1. [MongoDB Atlas Setup](#1-mongodb-atlas-setup)
2. [Get Database Connection String](#2-get-database-connection-string)
3. [Environment Variables Setup](#3-environment-variables-setup)
4. [Prisma Setup](#4-prisma-setup)
5. [NextAuth Configuration](#5-nextauth-configuration)
6. [Create Admin User](#6-create-admin-user)
7. [Test Authentication](#7-test-authentication)

---

## 1. MongoDB Atlas Setup

### Step 1: Create MongoDB Atlas Account

1. Go to [https://www.mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register)
2. Sign up with your email (it's FREE)
3. Verify your email address

### Step 2: Create a Free Cluster

1. After login, click **"Build a Database"**
2. Choose **"FREE" (M0 Sandbox)** tier
3. Select your preferred cloud provider (AWS, Google Cloud, or Azure)
4. Choose a region closest to you (e.g., `Mumbai (ap-south-1)` for India)
5. Click **"Create"** (takes 3-5 minutes)

### Step 3: Create Database User (Password)

1. Go to **"Database Access"** in the left sidebar
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication method
4. Enter:
   - **Username**: `delhityreshoppe` (or any username you prefer)
   - **Password**: Click **"Autogenerate Secure Password"** or create your own
   - **IMPORTANT**: **Copy and save the password** - you won't see it again!
5. Under **"Database User Privileges"**, select **"Atlas admin"** (or "Read and write to any database")
6. Click **"Add User"**

### Step 4: Whitelist IP Address

1. Go to **"Network Access"** in the left sidebar
2. Click **"Add IP Address"**
3. For development, click **"Allow Access from Anywhere"** (adds `0.0.0.0/0`)
   - ⚠️ For production, use specific IP addresses
4. Click **"Confirm"**

---

## 2. Get Database Connection String

### Step 1: Get Connection String

1. Go to **"Database"** in the left sidebar
2. Click **"Connect"** button on your cluster
3. Choose **"Connect your application"**
4. Select **"Node.js"** and version **"5.5 or later"**
5. **Copy the connection string** - it looks like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### Step 2: Replace Placeholders

Replace the placeholders in the connection string:

- Replace `<username>` with your database username (e.g., `delhityreshoppe`)
- Replace `<password>` with your database password (URL-encode special characters if any)
- Add your database name after the `/`:
  ```
  mongodb+srv://delhityreshoppe:yourpassword@cluster0.xxxxx.mongodb.net/delhi_tyre_shoppee?retryWrites=true&w=majority
  ```

**Example:**
```
mongodb+srv://delhityreshoppe:MyP@ssw0rd123@cluster0.abc123.mongodb.net/delhi_tyre_shoppee?retryWrites=true&w=majority
```

**Note:** If your password has special characters, URL-encode them:
- `@` → `%40`
- `#` → `%23`
- `$` → `%24`
- `%` → `%25`
- `&` → `%26`
- `+` → `%2B`
- `=` → `%3D`

---

## 3. Environment Variables Setup

### Step 1: Create `.env` File

Create a `.env` file in the root directory of your project:

```env
# MongoDB Atlas Connection
DATABASE_URL="mongodb+srv://yourusername:yourpassword@cluster0.xxxxx.mongodb.net/delhi_tyre_shoppee?retryWrites=true&w=majority"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Email Configuration (Optional - for contact form)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_EMAIL=info@delhityreshoppe.com
```

### Step 2: Generate NEXTAUTH_SECRET

**Option A: Using OpenSSL (if installed)**
```bash
openssl rand -base64 32
```

**Option B: Using Node.js**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**Option C: Online Generator**
- Go to [https://generate-secret.vercel.app/32](https://generate-secret.vercel.app/32)
- Copy the generated secret

**Example `.env` file:**
```env
DATABASE_URL="mongodb+srv://delhityreshoppe:MyP@ssw0rd123@cluster0.abc123.mongodb.net/delhi_tyre_shoppee?retryWrites=true&w=majority"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="aBc123XyZ456DeF789GhI012JkL345MnO678PqR901StU234VwX567YzA890="
```

---

## 4. Prisma Setup

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Generate Prisma Client

This creates the Prisma Client based on your schema:

```bash
npm run db:generate
```

**Expected output:**
```
✔ Generated Prisma Client (version X.X.X) to ./node_modules/.prisma/client in XXXms
```

### Step 3: Push Schema to MongoDB

This creates the collections in your MongoDB database:

```bash
npm run db:push
```

**Expected output:**
```
✔ The following schema(s) have been pushed:
  - prisma/schema.prisma

Your database is now in sync with your Prisma schema.
```

**Collections created:**
- `users` - User accounts
- `sessions` - NextAuth sessions
- `activity_logs` - User activity tracking

### Step 4: Verify in MongoDB Atlas

1. Go to MongoDB Atlas → **"Database"** → **"Browse Collections"**
2. Click on your database `delhi_tyre_shoppee`
3. You should see 3 collections:
   - `users`
   - `sessions`
   - `activity_logs`

---

## 5. NextAuth Configuration

The NextAuth configuration is already set up in `lib/auth.ts`. Verify it exists and is correct.

### Check Configuration

The file `lib/auth.ts` should contain:
- PrismaAdapter for MongoDB
- CredentialsProvider for email/password login
- JWT session strategy
- Role-based callbacks

### Verify API Route

Check that `app/api/auth/[...nextauth]/route.ts` exists and exports the handler.

---

## 6. Create Admin User

### Option A: Using Prisma Studio (Recommended)

1. **Start Prisma Studio:**
   ```bash
   npm run db:studio
   ```

2. **Open in browser:**
   - Prisma Studio opens at `http://localhost:5555`
   - You'll see your collections

3. **Create Admin User:**
   - Click on `users` collection
   - Click **"Add record"**
   - Fill in the form:
     ```
     name: Admin User
     email: admin@delhityreshoppe.com
     phone: (optional)
     password: (hashed - see below)
     role: ADMIN
     isActive: true
     ```

4. **Hash the Password:**
   - Open a new terminal
   - Run:
     ```bash
     node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('admin123', 12).then(hash => console.log(hash))"
     ```
   - Copy the hashed password
   - Paste it in the `password` field in Prisma Studio

5. **Save the record**

### Option B: Using Signup API

1. **Start your dev server:**
   ```bash
   npm run dev
   ```

2. **Create admin via API:**
   ```bash
   curl -X POST http://localhost:3000/api/auth/signup \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Admin User",
       "email": "admin@delhityreshoppe.com",
       "password": "admin123",
       "role": "ADMIN"
     }'
   ```

### Option C: Create Script

Create `scripts/createAdmin.ts`:

```typescript
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
type UserRole = 'ADMIN' | 'MANAGER' | 'STAFF'

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
  
  console.log('✅ Admin user created:', admin)
  console.log('Email:', admin.email)
  console.log('Password: admin123')
}

main()
  .catch((e) => {
    console.error('❌ Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
```

Run it:
```bash
npx ts-node scripts/createAdmin.ts
```

---

## 7. Test Authentication

### Step 1: Start Development Server

```bash
npm run dev
```

### Step 2: Test Login

1. Open `http://localhost:3000`
2. Click **"Login"** button in the header
3. Enter credentials:
   - Email: `admin@delhityreshoppe.com`
   - Password: `admin123` (or the password you set)
4. Click **"Login"**

### Step 3: Verify Redirect

After successful login, you should be redirected to:
- `/ims/admin/dashboard` (for ADMIN role)

### Step 4: Check Session

1. Open browser DevTools (F12)
2. Go to **Application** → **Cookies**
3. You should see `next-auth.session-token` cookie

### Step 5: Test Signup

1. Click **"Sign Up"** button
2. Fill in the form
3. After signup, you should be auto-logged in
4. New users default to `STAFF` role

---

## 🔧 Troubleshooting

### Issue: "MongoDB error: Server selection timeout"

**Solution:**
- Check MongoDB Atlas cluster is running (green status)
- Verify IP address is whitelisted
- Check connection string is correct
- Ensure password is URL-encoded if it has special characters

### Issue: "Prisma Client not generated"

**Solution:**
```bash
rm -rf node_modules/.prisma
npm run db:generate
```

### Issue: "Cannot find module '@prisma/client'"

**Solution:**
```bash
npm install @prisma/client
npm run db:generate
```

### Issue: "Invalid credentials" on login

**Solution:**
- Verify user exists in MongoDB
- Check password is correctly hashed
- Use Prisma Studio to verify user data

### Issue: "NEXTAUTH_SECRET is missing"

**Solution:**
- Ensure `.env` file exists in root directory
- Check `NEXTAUTH_SECRET` is set
- Restart dev server after adding it

---

## ✅ Verification Checklist

- [ ] MongoDB Atlas account created
- [ ] Cluster created and running
- [ ] Database user created with password
- [ ] IP address whitelisted
- [ ] Connection string copied and updated
- [ ] `.env` file created with all variables
- [ ] `NEXTAUTH_SECRET` generated
- [ ] Prisma client generated (`npm run db:generate`)
- [ ] Schema pushed to MongoDB (`npm run db:push`)
- [ ] Collections visible in MongoDB Atlas
- [ ] Admin user created
- [ ] Can login successfully
- [ ] Redirected to correct dashboard
- [ ] Session cookie created

---

## 🚀 Quick Start Commands

```bash
# 1. Install dependencies
npm install

# 2. Generate Prisma Client
npm run db:generate

# 3. Push schema to MongoDB
npm run db:push

# 4. Create admin user (choose one method)
npm run db:studio  # Then create user manually
# OR
npx ts-node scripts/createAdmin.ts

# 5. Start development server
npm run dev

# 6. Open browser
# http://localhost:3000
```

---

## 📚 Additional Resources

- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Prisma MongoDB Guide](https://www.prisma.io/docs/concepts/database-connectors/mongodb)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Prisma Studio Guide](https://www.prisma.io/studio)

---

**Need Help?** If you encounter any issues, check the error message and refer to the troubleshooting section above.

