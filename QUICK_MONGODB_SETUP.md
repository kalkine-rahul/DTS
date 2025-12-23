# Quick MongoDB Setup Guide

## 🚀 Option 1: MongoDB Atlas (Cloud - EASIEST - Recommended)

**No installation needed!** Use free cloud database.

### Steps:

1. **Go to MongoDB Atlas**
   - Visit: https://www.mongodb.com/cloud/atlas/register
   - Sign up for free account

2. **Create Free Cluster**
   - Click "Build a Database"
   - Choose **FREE** (M0) tier
   - Select cloud provider (AWS recommended)
   - Choose region closest to you
   - Click "Create"

3. **Create Database User**
   - Go to "Database Access" → "Add New Database User"
   - Authentication: Password
   - Username: `delhityreshoppe` (or your choice)
   - Password: Create strong password (save it!)
   - Database User Privileges: "Atlas admin"
   - Click "Add User"

4. **Whitelist IP Address**
   - Go to "Network Access" → "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Or add your current IP: Click "Add Current IP Address"
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Driver: Node.js
   - Version: 5.5 or later
   - Copy the connection string
   - It looks like:
     ```
     mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
     ```

6. **Update Your .env File**
   ```env
   DATABASE_URL="mongodb+srv://delhityreshoppe:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/delhi_tyre_shoppee?retryWrites=true&w=majority"
   ```
   Replace:
   - `YOUR_PASSWORD` with your database user password
   - `cluster0.xxxxx` with your actual cluster name
   - Add database name: `/delhi_tyre_shoppee` before the `?`

7. **Test Connection**
   ```bash
   npm run db:push
   ```

---

## 💻 Option 2: Install MongoDB Locally (Windows)

### Step 1: Download MongoDB

1. Go to: https://www.mongodb.com/try/download/community
2. Select:
   - Version: Latest (7.0+)
   - Platform: Windows
   - Package: MSI
3. Click "Download"

### Step 2: Install MongoDB

1. Run the downloaded `.msi` file
2. Choose "Complete" installation
3. **Important**: Check "Install MongoDB as a Service"
4. Service Name: `MongoDB`
5. Check "Run service as Network Service user"
6. **Uncheck** "Install MongoDB Compass" (optional GUI tool)
7. Click "Install"

### Step 3: Verify Installation

Open new PowerShell/Command Prompt and run:
```powershell
mongod --version
```

### Step 4: Start MongoDB Service

MongoDB should start automatically. If not:

```powershell
# Check if service is running
Get-Service MongoDB

# Start service if not running
Start-Service MongoDB
```

### Step 5: Update .env File

```env
DATABASE_URL="mongodb://localhost:27017/delhi_tyre_shoppee"
```

### Step 6: Test Connection

```bash
npm run db:push
```

---

## ✅ Quick Test

After setting up either option, test the connection:

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database
npm run db:push
```

If successful, you'll see:
```
✔ Generated Prisma Client
✔ The following schema(s) have been pushed to MongoDB
```

---

## 🔧 Troubleshooting

### MongoDB Atlas Issues

1. **Connection timeout**
   - Check IP whitelist includes your IP
   - Verify username/password in connection string

2. **Authentication failed**
   - Double-check password (no special character encoding issues)
   - Verify database user has correct privileges

### Local MongoDB Issues

1. **Service not starting**
   ```powershell
   # Check service status
   Get-Service MongoDB
   
   # Start service
   Start-Service MongoDB
   
   # Check logs
   Get-EventLog -LogName Application -Source MongoDB -Newest 10
   ```

2. **Port already in use**
   - Check if another MongoDB instance is running
   - Change port in connection string (not recommended)

3. **Permission errors**
   - Run PowerShell as Administrator
   - Check MongoDB data directory permissions

---

## 📝 Recommended: Use MongoDB Atlas

**Why MongoDB Atlas?**
- ✅ No installation needed
- ✅ Free tier (512MB storage)
- ✅ Automatic backups
- ✅ Easy to scale
- ✅ Works from anywhere
- ✅ Secure by default
- ✅ No local setup required

**Perfect for development and production!**

---

## 🎯 Next Steps After Setup

1. ✅ MongoDB connected
2. ✅ Run `npm run db:generate`
3. ✅ Run `npm run db:push`
4. ✅ Create admin user
5. ✅ Test login/signup

---

**Need help?** Check `MONGODB_SETUP.md` for detailed instructions.

