"use client"

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import cross from "../../../public/cross.png";

type ButtonProps = {
    route: string;
}

const CloseButton = ({ route }: ButtonProps) => {
    const router = useRouter();
    
    const handleClick = () => {
        router.push(route);
    };

    return (
        <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700" onClick={handleClick}>
            <Image src={ cross } width={30} height={30} alt="cross"/>
        </button>
    );
};

export default CloseButton;
