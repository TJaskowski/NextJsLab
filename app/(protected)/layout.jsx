'use client'
import { useAuth } from "@/app/lib/AuthContext";
import { useLayoutEffect } from "react";
import { redirect, usePathname } from 'next/navigation';


function Protected({children}) {
    const { user } = useAuth();
    const returnUrl = usePathname();

    useLayoutEffect(() => {
        console.dir(user?.emailVerified);
        if (!user){
            console.log("user not logged!")
            redirect(`/user/login?returnUrl=${returnUrl}`); // check path
        }
        if(!user?.emailVerified){
            redirect('/user/verified'); // check path
        }
    }, []);
    return ( <>
    { children }
    </> );
}

export default Protected;