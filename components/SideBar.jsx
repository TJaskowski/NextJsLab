"use client";
import { AuthProvider } from "@/app/lib/AuthContext";
import Link from "next/link";
import { useContext } from "react";
function SideBar({children}) {
    const {user} = useContext(AuthProvider);
    return ( 
        <div className="drawer">
  <input id="my-drawer" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">
    {children}
    <label htmlFor="my-drawer" className="btn btn-primary drawer-button">Open drawer</label>
  </div>
  <div className="drawer-side">
    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
      {/* Sidebar content here */}
      <li><Link href="/user/login">Login</Link></li>
      <li><Link href="/user/login">Login</Link></li>
      <li><Link href="/user/profile">{user}</Link></li>
      <li><a>Sidebar Item 2</a></li>
    </ul>
  </div>
</div>
     );
}

export default SideBar;