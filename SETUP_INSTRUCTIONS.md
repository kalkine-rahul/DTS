# Quick Setup Instructions

## 1. Install Missing Dependencies

```bash
npm install @next-auth/prisma-adapter
```

## 2. Set Up Environment Variables

Create `.env` file:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/delhi_tyre_shoppe"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
```

## 3. Initialize Database

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database
npm run db:push
```

## 4. Create Admin User

Use Prisma Studio:
```bash
npm run db:studio
```

Or create via API:
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin",
    "email": "admin@example.com",
    "password": "admin123",
    "role": "ADMIN"
  }'
```

## 5. Run Development Server

```bash
npm run dev
```

## Features Implemented

✅ **Authentication System**
- Login/Signup modals
- NextAuth.js with JWT
- MongoDB + Prisma
- Password hashing (bcrypt)
- HttpOnly cookies

✅ **Role-Based Access**
- ADMIN → `/ims/admin/dashboard`
- MANAGER → `/ims/manager/dashboard`
- STAFF → `/ims/staff/dashboard`

✅ **Protected Routes**
- Middleware protection for `/ims/*`
- Role-based access control
- Auto-redirect on unauthorized access

✅ **UI Components**
- Modal-based login/signup
- Responsive design
- Dark theme dashboards
- Sidebar navigation

✅ **Database Models**
- User (with roles)
- Session (NextAuth)
- ActivityLog (tracking)

## File Structure

```
├── app/api/auth/          # Auth API routes
├── app/ims/               # Dashboard pages
├── components/
│   ├── LoginModal.tsx
│   ├── SignupModal.tsx
│   └── dashboards/        # Dashboard components
├── lib/
│   ├── auth.ts           # NextAuth config
│   └── prisma.ts         # Prisma client
├── middleware.ts         # Route protection
└── prisma/schema.prisma  # Database schema
```

## Next Steps

1. Install dependencies: `npm install`
2. Set up database connection
3. Run migrations
4. Create admin user
5. Test login/signup flow
6. Customize dashboards

See `AUTH_SETUP.md` for detailed documentation.

