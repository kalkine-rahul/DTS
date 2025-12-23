import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from './prisma'
import bcrypt from 'bcryptjs'
type UserRole = 'ADMIN' | 'MANAGER' | 'STAFF'


export const authOptions: NextAuthOptions = {
adapter: PrismaAdapter(prisma),
providers: [
CredentialsProvider({
name: 'Credentials',
credentials: {
email: { label: 'Email', type: 'email' },
password: { label: 'Password', type: 'password' },
},
async authorize(credentials) {
if (!credentials?.email || !credentials?.password) {
throw new Error('Email and password required')
}

    const user = await prisma.user.findUnique({
      where: { email: credentials.email },
    })

    if (!user || !user.isActive) {
      throw new Error('Invalid credentials')
    }

    const isPasswordValid = await bcrypt.compare(credentials.password, user.password)

    if (!isPasswordValid) {
      throw new Error('Invalid credentials')
    }

    await prisma.activityLog.create({
      data: {
        userId: user.id,
        action: 'LOGIN',
        details: 'User logged in successfully',
      },
    })

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    }
  },
}),
],
session: { strategy: 'jwt' },
callbacks: {
async jwt({ token, user }) {
if (user) {
token.id = user.id
token.role = (user as any).role
}
return token
},
async session({ session, token }) {
if (session.user) {
session.user.id = token.id as string
session.user.role = token.role as UserRole
}
return session
},
},
pages: { signIn: '/' },
secret: process.env.NEXTAUTH_SECRET,
}
