"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import CloseButton from "../components/closeButton";
import { UserFormInputDTO } from "../api/register/dto";
import validatePassword from "./passValidate";

const SignupForm: React.FC = () => {
    const router = useRouter();
    const { data: session } = useSession()
    if (session?.user) {
        router.push("/")
    }

    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirm-password") as string;

        if (password !== confirmPassword) {
            setError("Passwords do not match.")
            return;
        }

        const { valid, message } = validatePassword(password)
        if (!valid) {
            setError(message)
            return;
        }

        setError("")

        const userData: UserFormInputDTO = {
            email, 
            username, 
            password
        }

        const res = await fetch("api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        const data = await res.json();

        if (res.ok) {
            router.push("/login")
        } else {

            setError(data.error)
        }
    }

    return (
    <>
    <div className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute flex justify-center items-center z-20">
        <CloseButton/>
        <div className="bg-white p-14 rounded-2xl shadow-lg w-full block">
        <h2 className="text-2xl font-bold text-center mb-4">Join us now for perks and more!</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
            <label htmlFor="email" className="block font-semibold mb-1">Email</label>
            <input type="email" id="email" name="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-vermillion"
            required
            />
            </div>

            <div>
            <label htmlFor="username" className="block font-semibold mb-1">Username</label>
            <input id="username" name="username"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-vermillion"
            required
            />
            </div>

            <div>
            <label htmlFor="password" className="block font-semibold mb-1">Password</label>
            <input type="password" id="password" name="password"
            className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-vermillion"
            required
            />
            </div>

            <div>
            <label htmlFor="confirm-password" className="block font-semibold mb-1">Confirm Password</label>
            <input type="password" id="confirm-password" name="confirm-password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-vermillion"
            required
            />
            </div>
            {error && <p className="text-red text-center">
                {error.split('\n').map((line, index) => (
                    <span key={index}>
                        {line}
                        <br />
                    </span>
                ))}</p>}
            <button className="w-full py-2 bg-orange-500 text-white bg-vermillion font-semibold rounded-md hover:bg-orange-600" type="submit">
            Create account
            </button>
        </form>
        </div>
    </div>

    {/* Full-screen overlay */}
    <div className={`fixed inset-0 bg-black opacity-50 visible z-10`}/>
    </>
    )
};

export default SignupForm