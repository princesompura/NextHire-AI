"use client"
import { UserDetailContext } from '@/context/UserDetailContext';
import { supabase } from '@/services/supabaseClient'
import React, { useContext, useEffect, useState } from 'react'


function Provider({ children }) {


    const [user,setUser] = useState();
    useEffect(()=>{
        CreateNewUser();
    },[])

    const CreateNewUser = () => {
        supabase.auth.getUser().then(async ({ data: { user }, error }) => {
            console.log("Fetched user:", user); // Debugging log
            if (!user) {
                console.error("No user found. Please sign in.");
                return;
            }

            // Check if user already exists
            let { data: Users, error: fetchError } = await supabase
                .from("Users")
                .select("*")
                .eq("email", user?.email);

            console.log("Users from database:", Users);

            // If not, create a new user in the database
            if (Users?.length === 0) {
                const { data, error: insertError } = await supabase.from("Users").insert([
                    {
                        name: user?.user_metadata?.full_name,
                        email: user?.email,
                        picture: user?.user_metadata?.picture,
                    },
                ]);
                console.log("Inserted user:", data);
                setUser(data?.[0]); // Set the newly created user as an object
                return;
            }

            setUser(Users?.[0]); // Set the existing user as an object
        });
    }

    return (
        <UserDetailContext.Provider value={{user, setUser}}>
            <div>
                {children}
            </div>
        </UserDetailContext.Provider>
    )
}

export default Provider;

export const useUser = () => {
    const context = useContext(UserDetailContext);
    return context;
}
