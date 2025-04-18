"use client";
import { useUser } from '@/app/Provider';
import React from 'react';

function WelcomeContainer() {
    const { user } = useUser();
    console.log("User in WelcomeContainer:", user); // Debugging log

    return (
        <div>
            <div>
                <h2> Welcome Back, {user?.name || "Guest"} </h2>
            </div>
        </div>
    );
}

export default WelcomeContainer;
