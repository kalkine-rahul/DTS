type UserRole = 'ADMIN' | 'MANAGER' | 'STAFF'

import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🚀 Creating admin user...')
  
  const email = 'admin@delhityreshoppe.com'
  const password = 'admin123'
  
  // Check if admin already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  })
  
  if (existingUser) {
    console.log('⚠️  Admin user already exists!')
    console.log('Email:', existingUser.email)
    console.log('Role:', existingUser.role)
    return
  }
  
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 12)
  
  // Create admin user
  const admin = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: email,
      password: hashedPassword,
      role: 'ADMIN',
      isActive: true,
    },
  })
  
  console.log('✅ Admin user created successfully!')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('Email:', admin.email)
  console.log('Password:', password)
  console.log('Role:', admin.role)
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('💡 You can now login with these credentials')
}

main()
  .catch((e) => {
    console.error('❌ Error creating admin user:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

