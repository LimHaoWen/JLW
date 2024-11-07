import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { User } from "next-auth";
import Link from "next/link";
import DeleteAccount from "./deleteAccount";


const ManageAccount = async () => {
    const session = await auth();
    if (!session?.user) {
        redirect("/");
    }

    const userData: User = session.user;

    return (
        <>
        <div className="w-[80vw] lg:w-[60vw] h-full mx-auto pt-24 text-sm font-medium lg:text-base lg:pt-48">
            <p className="font-bold mb-5 lg:text-2xl ">Account</p>
            <div>
                <label className="block mb-1.5">Email</label>
                <input type="text" id="email" name="username" value={userData.email ?? ""} disabled
                    className="w-52 h-5 pl-3 bg-lightgray border border-vermillion rounded-md lg:w-72 lg:h-7"/>
            </div>
            <div className="pb-9 border-b mt-10">
                <label>Password</label>
                <Link className="w-36 h-10 rounded-md bg-vermillion pt-2 text-sm text-white text-center 
                max-md:mt-4 md:ml-24 btn-hover-primary inline-block" href="/change-password">Change password</Link>
            </div>
            {/* <div className="mt-6">
                <label>Manage devices</label>
                <button className="w-24 h-7 rounded-md bg-vermillion text-sm text-white ml-24 btn-hover-primary">Manage</button>
            </div> */}
            <DeleteAccount user={userData}/>
        </div>
        </>
    )
}

export default ManageAccount