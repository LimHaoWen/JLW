import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { userService } from "@/usecase/userService";
import { User } from "@/app/domain/entities/user";

export const { handlers, signIn, signOut, auth } = NextAuth({
    session: {
        strategy: "jwt",
        maxAge: 86400,
    }, 
    providers: [
        Credentials({
            credentials: {
                identifier: {},
                password: {},
            },
            authorize: async (credentials) => {
                if (!credentials || typeof credentials.password !== "string" || typeof credentials.identifier !== "string") {
                    throw new Error("Invalid credentials");
                };
                
                let response: User | undefined

                if (String(credentials.identifier).includes("@")) {
                    response = await userService.getUserByEmail(credentials.identifier)
                } else {
                    response = await userService.getUserByUsername(credentials.identifier)
                }
        
                if (!response || response == undefined) {
                    return null;
                }

                const isMatch = await bcrypt.compare(String(credentials.password), response.password);
        
                if (isMatch) {
                    return {...response, password:null, role: response.role_type};
                } else {
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
                token.username = user.username;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.role = token.role;
            session.user.username = token.username;
            return session;
        }
      },
})