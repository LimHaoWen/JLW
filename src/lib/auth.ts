import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { userService } from "@/usecase/userService";
import { User } from "@/app/domain/entities/user";

export const { handlers, signIn, signOut, auth } = NextAuth({
    session: {
        strategy: "jwt",
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

                let user: User | undefined

                if (String(credentials.identifier).includes("@")) {
                    user = await userService.getUserByEmail(credentials.identifier)
                } else {
                    user = await userService.getUserByUsername(credentials.identifier)
                }
        
                if (!user || user == undefined) {
                    return null;
                }

                const isMatch = await bcrypt.compare(String(credentials.password), user.password);
        
                if (isMatch) {
                    return user;
                } else {
                    return null;
                }
            },
        }),
    ],
})