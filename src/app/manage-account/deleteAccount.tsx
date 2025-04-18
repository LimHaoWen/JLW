"use client"

import { useState } from "react";
import { User } from "next-auth";
import { SignOut } from "@/lib/auth/authActions";
import { useRouter } from "next/navigation";
import { usernameDTO } from "../api/delete-account/dto";
import Image from "next/image";
import success from "../../../public/success.gif";
import CloseButton from "../components/closeButton";


type UserProps = {
    user: User;
}

const DeleteAccount = ({ user }: UserProps) => {
    const router = useRouter();

    const [isDelete, setIsDelete] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const handleTrigger = () => {
        setIsDelete(!isDelete);
    }

    const handleDelete = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const username = formData.get("delete") as string;

        const userData: usernameDTO = {
            username: username
        }

        if (user.username !== username) {
            setError("Username is not correct.");
            return;
        }
        
        const res = await fetch("api/delete-account", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        setError("");

        const data = await res.json();

        if (!data.ok) {
           setError(data.error);
        }

        setIsDelete(!isDelete);
        setIsSuccess(!isSuccess);
        SignOut("", false);
    }

    return (
        <>
        <div className="mt-6">
            <label>Delete Account</label>
            <button className="w-24 h-7 rounded-md bg-vermillion text-sm text-white ml-[6.45rem] btn-hover-primary" 
            onClick={handleTrigger}>Delete</button>
        </div>

        {/* Delete form */}
        <div className={`w-96 h-64 bg-white rounded-2xl shadow-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
            absolute transition-opacity duration-100 ease-linear 
            ${isDelete ? "opacity-100 visible z-20" : "opacity-0 invisible z-0"}`}>
            <CloseButton route="/"/>
            <form className="pt-16 text-center justify-center" onSubmit={handleDelete}>
                <label htmlFor="delete">Enter username to delete your account permanently.</label>
                <input className="w-40 my-3 text-center bg-lightgray border border-vermillion rounded-md 
                lg:w-72 lg:h-7" id="delete" name="delete" type="text" required/>
                {error && <p className="text-red text-sm">{error}</p>}
                <button className="w-36 h-7 mt-2 rounded-md bg-vermillion text-sm text-white btn-hover-primary" type="submit">Delete Account</button>
            </form>
        </div>

        {/* Delete successful window */}
        <div className={`w-96 h-72 bg-white rounded-2xl shadow-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
            absolute transition-opacity duration-100 ease-linear flex flex-col items-center justify-center space-y-4
            ${isSuccess ? "opacity-100 visible z-20" : "opacity-0 invisible z-0"}`}>
            <Image className="size-20" src={ success } alt="success"></Image>
            <p className="text-center text-2xl">Success!</p>
            <p className="text-center px-10">Your account was successfully deleted. Hope to see you again!</p>
            <button className="w-24 h-7 rounded-md bg-vermillion text-sm text-white btn-hover-primary" 
            type="button" onClick={() => {
                SignOut("", false);
                router.push("/");
                }}>OK</button>
        </div>
        
        {/* Full-screen overlay */}
        <div className={`fixed inset-0 bg-black transition-opacity duration-100 ease-out
        ${isDelete || isSuccess ? 'opacity-50 visible z-10' : 'opacity-0 invisible z-0'}`}/>
        </>
    )
}

export default DeleteAccount;