import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from './prisma'

// Verify hashed password
export async function verifyPassword(plainPassword: string, hashedPassword: string) {
return bcrypt.compare(plainPassword, hashedPassword)
}

// Generate JWT token
export function generateToken(payload: object) {
return jwt.sign(payload, process.env.JWT_SECRET || 'default_secret', {
expiresIn: '7d',
})
}

// Create activity log entry
export async function createActivityLog(
userId: string,
type: string,
message: string,
ip?: string,
userAgent?: string
) {
try {
await prisma.activityLog.create({
data: {
userId,
type,
message,
ip: ip || null,
userAgent: userAgent || null,
},
})
} catch (err) {
console.error('Activity Log Error:', err)
}
}
