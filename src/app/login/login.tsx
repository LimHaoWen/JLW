"use client"

import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import CloseButton from "../components/closeButton";
import { SignIn } from "../../lib/authActions";

const LoginForm: React.FC = () => {
    const router = useRouter();

    const { data: session } = useSession()
    if (session?.user) {
        router.push("/")
    }

    const [data, action, isPending]= useFormState(SignIn, undefined)

    const handleRedirect = () => {
        router.push("/register");
    };
    
    return (
    <>
    <div className={`top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute flex justify-center items-center z-20`}>
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full">
        <CloseButton/>
        <form className="space-y-4" action={action}>
            <div>
                <label htmlFor="identifier" className="block font-semibold mb-1">Username/email</label>
                <input name="identifier" id="identifier" 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-vermillion" 
                required/>
            </div>
            <div>
                <label htmlFor="password" className="block font-semibold mb-1">Password</label>
                <input type="password" name="password" id="password" 
                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-vermillion" 
                required/>
            </div>
            {data?.error && <p className="text-red text-center">{data.error}</p>}
            <button disabled={isPending} className="w-full py-2 mt-2 bg-red-500 text-white font-semibold rounded-md bg-vermillion hover:bg-red-600" type="submit">
            {isPending ? "Logging in..." : "Login" }
            </button>
        </form>
        <button onClick={handleRedirect} className="w-full mt-4">Create account</button>
        </div>
    </div>

    {/* Full-screen overlay */}
    <div className={`fixed inset-0 bg-black opacity-50 visible z-10`}/>
    </>
    )
}

export default LoginForm