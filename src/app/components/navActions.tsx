"use client"

import React, { useState } from "react";
import Profile from "../../../public/profile-icon.png";
import Cart from "../../../public/cart-icon.png";
import Image from "next/image";
import { User } from "next-auth";
import CartItems from "./cart";
import ProfileDropdown from "./profileDropdown";
import { useRouter } from "next/navigation";

interface NavActionProps {
    user?: User;
}

const NavActions: React.FC<NavActionProps> = ({ user }) => {
    const router = useRouter();

    const [isActive, setIsActive] = useState<boolean>(false);
    const [isProfile, setIsProfile] = useState<boolean>(false);
    const [isCart, setIsCart] = useState<boolean>(false);
    const [cartItems, setCartItems] = useState<TransactionItem[]>([]);

    const toggleProfile = () => {
        setIsProfile(!isProfile);
        setIsActive(!isActive);
    }

    const toggleCart = () => {
        setIsCart(!isCart);
        setIsActive(!isActive);
    }
    
    const closeAll = () => {
        setIsProfile(false);
        setIsCart(false);
        setIsActive(false);
    };

    const fetchCartItems = async () => {
        try { 
            const res = await fetch("/api/cart");

            if (!res.ok) {
                throw new Error("Failed to fetch cart items");
            }

            const cartItems: TransactionItem[] = await res.json();
            setCartItems(cartItems);
        } catch (error) {
            console.error("Error fetching cart items:", error);
        }
    }

    const handleClick = () => {
        fetchCartItems()
        toggleCart()
    }

    return (
    <>
    <button className="mr-6" onClick={ user ? toggleProfile : ()=> router.push("/login")}>
        {user ? <Image className="size-6 lg:size-8" src={ Profile } alt="Profile"/> : 
        <div className="w-20 h-7 pt-0.5 rounded-md font-medium bg-lightverm btn-hover-secondary">Login</div>
        }
    </button>
    <button className="size-6 lg:size-8 mr-6 lg:mr-24 lg:ml-12" onClick={handleClick}>
        <Image src={ Cart } alt="Cart"/>
    </button>
    <ProfileDropdown isProfile={isProfile} closeAll={closeAll}/>
    <CartItems isCart={isCart} cartItems={cartItems}/>

    {/* Full-screen overlay */}
    <div className={`fixed inset-0 bg-black transition-opacity duration-500 ease-out
    ${isActive ? 'opacity-50 visible z-10' : 'opacity-0 invisible z-0'}`}
    onClick={closeAll}>
    </div>
    </>
)};

export default NavActions