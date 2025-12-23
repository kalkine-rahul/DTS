import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

type UserRole = 'ADMIN' | 'MANAGER' | 'STAFF' // MongoDB Prisma does NOT export enums

export async function POST(request: NextRequest) {
try {
const body = await request.json()
const { name, email, phone, password, role } = body

```
if (!name || !email || !password) {
  return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
}

const existing = await prisma.user.findUnique({
  where: { email },
})

if (existing) {
  return NextResponse.json({ error: 'User already exists' }, { status: 400 })
}

const hashedPassword = await bcrypt.hash(password, 10)

const newUser = await prisma.user.create({
  data: {
    name,
    email,
    phone,
    password: hashedPassword,
    role: (role as UserRole) || 'STAFF',
  },
})

return NextResponse.json({
  success: true,
  user: {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
  },
})
```

} catch (error) {
console.error('Signup Error:', error)
return NextResponse.json(
{ error: 'Internal server error' },
{ status: 500 }
)
}
}
