"use server"

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

export async function SignIn(previousState: unknown, formData: FormData) {
    const identifier = formData.get("identifier") as string;
    const password = formData.get("password") as string;

    try { 
        await signIn("credentials", {
        identifier,
        password,
        redirectTo: "/",
    });
    } catch (error) {
        if (error instanceof AuthError) {
            return { error: "Incorrect username/password." }
        }
        throw error;
    }
}

export async function SignOut() {
    await signOut({
        redirectTo: "/"
    })
}
