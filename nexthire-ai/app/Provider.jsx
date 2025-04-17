"use client"
import { supabase } from '@/services/supabaseClient'
import React, { useContext, useEffect, useState } from 'react'
import { UserDetailContext } from './context/UserDetailContext'

function Provider({ children }) {


    const [user,setUser] = useState();
    useEffect(()=>{
        CreateNewUser();
    },[])

    const CreateNewUser = () => {

        supabase.auth.getUser().then(async ({ data: { user } }) => {
            //Check if user already exist
            let { data: Users, error } = await supabase
                .from('Users')
                .select("*")
                .eq('email', user?.email);

            console.log(Users)

            //If not create a new user in the database
            if (Users?.length == 0) {
                const { data, error } = await supabase.from('Users').insert([
                    {
                        name: user?.user_metadata?.full_name,
                        email: user?.email,
                        picture: user?.user_metadata?.picture,
                    },
                ])
                console.log(data);
                setUser(data);
                return;

            }

            setUser(Users);
        })
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
