"use client";
import { useUser } from '@/app/Provider';
import Image from 'next/image';
import React from 'react';

function WelcomeContainer() {
    const { user } = useUser();
    console.log("User in WelcomeContainer:", user); // Debugging log

    return (
        <div className='bg-blue-50 p-5 rounded-xl w-full flex justify-between items-center  shadow-lg'>
            <div>
                <h2 className='text-lg font-bold'> Welcome Back, {user?.name || "Guest"} </h2>
                <h2 className='text-gray-500'>AI-Driven Interviews, Hassel-Free Hiring</h2>
            </div>
            {user&&<Image src={user?.picture} alt='userAvatar' width={60} height={40} className='rounded-full'/>}
        </div>
    );
}

export default WelcomeContainer;
