# Authentication & Inventory Management System Setup Guide

This guide will help you set up the complete authentication system and Inventory Management System (IMS) for Delhi Tyre Shoppe.

## 📋 Prerequisites

- Node.js 18+ installed
- PostgreSQL database (local or cloud)
- npm or yarn package manager

## 🗄️ Database Setup

### 1. Install PostgreSQL

If you don't have PostgreSQL installed:
- **Windows**: Download from [postgresql.org](https://www.postgresql.org/download/windows/)
- **macOS**: `brew install postgresql`
- **Linux**: `sudo apt-get install postgresql`

### 2. Create Database

```sql
CREATE DATABASE delhi_tyre_shoppe;
```

### 3. Set Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/delhi_tyre_shoppe?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here-generate-with-openssl-rand-base64-32"

# Email (for contact form - optional)
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

### 3. Push Schema to MongoDB

```bash
npm run db:push
```

This creates the collections in MongoDB (users, sessions, activity_logs).

### 4. Create First Admin User

You can create an admin user via Prisma Studio:

```bash
npm run db:studio
```

Or use this script:

```typescript
// scripts/createAdmin.ts

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

## 🔐 Authentication Flow

### User Roles

1. **ADMIN**: Full access to all features
   - Dashboard: `/ims/admin/dashboard`
   - Can manage all users, products, inventory

2. **MANAGER**: Management-level access
   - Dashboard: `/ims/manager/dashboard`
   - Can manage products, orders, invoices
   - Cannot manage users

3. **STAFF**: Limited access
   - Dashboard: `/ims/staff/dashboard`
   - Can view and update inventory
   - Limited permissions

### Login Process

1. User clicks **Login** button in header
2. Modal opens with email/password fields
3. On successful login:
   - JWT token stored in HttpOnly cookie
   - User redirected to role-based dashboard
   - Session maintained across page refreshes

### Signup Process

1. User clicks **Sign Up** button
2. Modal opens with registration form
3. After signup:
   - Account created with default role: **STAFF**
   - Auto-login performed
   - Redirected to staff dashboard

## 🛡️ Route Protection

All `/ims/*` routes are protected by middleware:

- **Unauthenticated users**: Redirected to homepage
- **Unauthorized role access**: Redirected to homepage
- **Valid session**: Access granted to appropriate dashboard

## 📁 Project Structure

```
DTS/
├── app/
│   ├── api/
│   │   └── auth/
│   │       ├── [...nextauth]/route.ts  # NextAuth handler
│   │       ├── signup/route.ts         # Signup endpoint
│   │       └── me/route.ts             # Get current user
│   ├── ims/
│   │   ├── admin/dashboard/            # Admin dashboard
│   │   ├── manager/dashboard/          # Manager dashboard
│   │   └── staff/dashboard/           # Staff dashboard
│   └── layout.tsx                      # Root layout with modals
├── components/
│   ├── LoginModal.tsx                  # Login modal
│   ├── SignupModal.tsx                 # Signup modal
│   ├── Navbar.tsx                      # Updated with auth buttons
│   └── dashboards/
│       ├── DashboardLayout.tsx         # Shared dashboard layout
│       ├── AdminDashboard.tsx          # Admin dashboard
│       ├── ManagerDashboard.tsx        # Manager dashboard
│       └── StaffDashboard.tsx         # Staff dashboard
├── lib/
│   ├── auth.ts                         # NextAuth configuration
│   ├── prisma.ts                       # Prisma client
│   └── getDashboardPath.ts            # Role-based redirect helper
├── middleware.ts                       # Route protection
├── prisma/
│   └── schema.prisma                   # Database schema
└── store/
    └── modalStore.ts                   # Zustand modal state
```

## 🔧 API Endpoints

### Authentication

- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/login` - Login (via NextAuth)
- `GET /api/auth/me` - Get current user info
- `POST /api/auth/logout` - Logout (via NextAuth)

### Example API Usage

```typescript
// Signup
const response = await fetch('/api/auth/signup', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    phone: '+91 1234567890',
  }),
})

// Get current user
const response = await fetch('/api/auth/me')
const { user } = await response.json()
```

## 🎨 Customization

### Change Default User Role

Edit `app/api/auth/signup/route.ts`:

```typescript
role: (role as UserRole) || UserRole.STAFF  // Change default role
```

### Modify Dashboard Redirects

Edit `lib/getDashboardPath.ts` to change redirect paths.

### Customize Session Duration

Edit `lib/auth.ts`:

```typescript
session: {
  strategy: 'jwt',
  maxAge: 30 * 24 * 60 * 60, // Change to desired seconds
}
```

## 🐛 Troubleshooting

### Database Connection Issues

1. Verify PostgreSQL is running
2. Check DATABASE_URL in `.env`
3. Test connection: `psql -U username -d delhi_tyre_shoppe`

### NextAuth Errors

1. Ensure `NEXTAUTH_SECRET` is set
2. Verify `NEXTAUTH_URL` matches your domain
3. Check browser console for detailed errors

### Prisma Issues

1. Run `npm run db:generate` after schema changes
2. Run `npm run db:push` to sync schema
3. Check Prisma Studio: `npm run db:studio`

## 🔒 Security Best Practices

1. **Never commit `.env` file** - Already in `.gitignore`
2. **Use strong passwords** - Minimum 12 characters
3. **Rotate NEXTAUTH_SECRET** regularly
4. **Enable HTTPS** in production
5. **Use environment-specific database URLs**
6. **Implement rate limiting** for auth endpoints
7. **Log authentication attempts** (ActivityLog model)

## 📝 Next Steps

1. ✅ Set up database and environment variables
2. ✅ Run migrations
3. ✅ Create admin user
4. ✅ Test login/signup flow
5. ✅ Customize dashboards for your needs
6. ✅ Integrate with existing inventory API
7. ✅ Add more dashboard features
8. ✅ Deploy to production

## 🚀 Production Deployment

### Environment Variables

Set these in your hosting platform (Vercel, Railway, etc.):

- `DATABASE_URL` - Production PostgreSQL URL
- `NEXTAUTH_URL` - Your production domain
- `NEXTAUTH_SECRET` - Strong random secret

### Database

Use MongoDB Atlas (recommended):
- **MongoDB Atlas** (Free tier available)
- Or self-hosted MongoDB

### Build & Deploy

```bash
npm run build
npm start
```

---

**Need Help?** Check the main README.md or open an issue.

