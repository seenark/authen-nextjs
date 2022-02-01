import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { connectToDatabase } from '../../../lib/db'
import { verifyPassword } from './auth'

export default NextAuth({
    session: {
        strategy: 'jwt'
    },
    providers: [
        Credentials({
            
        async authorize(credentials, req) {
            const client = await connectToDatabase()
            const db = client.db()
            const collection = db.collection('users')
            const user = await collection.findOne<{email:string, password:string}>({email: credentials?.email})
            
            if (!user) {
                client.close()
                throw new Error("no user found")
            }

            const isMatched = await verifyPassword(credentials!.password, user.password)
            if (!isMatched) {
                client.close()
                throw new Error("incorrected password")
            }

            client.close()
            return {
                email: user.email,
            } 
        },
        credentials: {
            email: { label: "Email", type: "text", placeholder: "email@google.com" },
            password: {  label: "Password", type: "password" }
          },
})
    ]
})