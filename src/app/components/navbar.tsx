import Logo from "../../../public/logo-icon.png";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import NavActions from "./navActions";
import { auth } from "@/auth";

const Navbar: React.FC = async () => {
    const session = await auth();
    const user = session?.user;

    return(
        <>
        <nav className="w-full h-16 bg-vermillion justify-between flex fixed z-10">
            <div className="flex items-center">
                <Link className="size-10 ml-6 lg:ml-24" href="/">
                    <Image src={ Logo } alt="Logo" priority={ true }/>
                </Link>
                <Link className="max-md:hidden font-bold lg:text-2xl lg:ml-8" href="/">Jalan Wangi
                </Link>
            </div>
            <div className="flex items-center">
                <NavActions user={user}/>
            </div>
        </nav>
        </>
    )};

export default Navbar