'use client'
import { useAuth } from "@/app/lib/AuthContext";
import { useEffect } from "react";
import { redirect, usePathname } from 'next/navigation';
import {auth} from "@/app/lib/firebase";


function Protected({children}) {
    const { user, loading } = useAuth();
    const returnUrl = usePathname();

    useEffect(() => {
      
        if (!loading && !user){
            // console.log("user not logged!")
            redirect(`/user/login?returnUrl=${returnUrl}`); // check path
        }
    }, [loading, user, returnUrl]);
    return ( <>
    { children }
    </> );
}

export default Protected;