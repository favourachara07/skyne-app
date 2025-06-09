import { NextAuthOptions, DefaultSession } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "./prisma"

// Extend NextAuth types to include 'id' on session.user
declare module "next-auth" {
  interface Session {
    user: {
      id: string
    } & DefaultSession["user"]
  }
  interface User {
    id: string
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        if (!user) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        }
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/auth/signin"
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Redirect to /welcome after successful registration
      if (url.includes('/auth/signup')) {
        return `${baseUrl}/welcome`
      }
      return baseUrl
    },
    async session({ token, session }) {
      if (token) {
        if (session.user) {
          session.user.id = typeof token.id === "string" ? token.id : ""
          session.user.name = token.name
          session.user.email = token.email
        }
      }
      return session
    },
    async jwt({ user, token }) {
      if (user) {
        token.id = user.id
      }
      return token
    }
  }
}