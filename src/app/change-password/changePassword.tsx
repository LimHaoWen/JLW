"use client"

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import validatePassword from "@/lib/auth/validatePassword";
import { ChangePasswordDTO } from "../api/change-password/dto";

const ChangePassword = () => {
    const router = useRouter();

    const {data: session, status } = useSession();
    if ((status === "unauthenticated")) {
        router.push("/");
    }

    const [message, setMessage] = useState<string>("");
    const [isSuccessful, setIsSuccessful] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSuccessful(false);
    
        const formData = new FormData(e.currentTarget);
        const oldPassword = formData.get("oldpassword") as string;
        const newPassword = formData.get("newpassword") as string;
        const confirmPassword = formData.get("confirmpassword") as string;

        const { valid, message } = validatePassword(newPassword);
        if (!valid) {
            setMessage(message);
            return;
        }

        if (oldPassword === newPassword) {
            setMessage("New password cannot be the same as old password.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }
        
        setMessage("");

        const passwordData: ChangePasswordDTO = {
            oldPassword: oldPassword,
            newPassword: newPassword
        }

        const res = await fetch("api/change-password", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(passwordData)
        });

        const data = await res.json();

        if (res.ok) {
            setIsSuccessful(true);
        }

        setMessage(data.message || data.error);
    }

    return (
        <>
        <div className="w-[80vw] lg:w-[60vw] h-full mx-auto pt-24 text-sm font-medium lg:text-base lg:pt-48">
            <p className="font-bold mb-5 lg:text-2xl ">Account</p>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                <label htmlFor="oldpassword" className="block font-semibold mb-1">Old password</label>
                <input type="password" id="oldpassword" name="oldpassword"
                className="w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-vermillion"
                required/>
                </div>

                <div>
                <label htmlFor="newpassword" className="block font-semibold mb-1">New password</label>
                <input type="password" id="newpassword" name="newpassword"
                className="w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-vermillion"
                required/>
                </div>

                <div>
                <label htmlFor="confirmpassword" className="block font-semibold mb-1">Confirm new password</label>
                <input type="password" id="confirmpassword" name="confirmpassword" 
                className="w-1/2 px-4 py-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-vermillion"
                required/>
                </div>
                {message && <p className={`${isSuccessful ? "text-green" : "text-red"} text-left`}>
                {message.split('\n').map((line) => (
                    <span>
                        {line}
                        <br/>
                    </span>
                ))}</p>}
                <button className="w-36 h-10 rounded-md bg-vermillion text-sm text-white max-md:mt-4 btn-hover-primary" type="submit">Change password</button>
            </form>
        </div>
        </>
    )
}

export default ChangePassword