'use client'
import { useAuth } from "@/app/lib/AuthContext";
import { signOut } from 'firebase/auth';
import { auth } from "@/app/lib/firebase";
import { useRouter } from 'next/navigation';

export default function Logout() { 
    const { user } = useAuth();
  const router = useRouter()
  const onSubmit = () => {
      signOut(auth);
      router.push("/");
  }

  if (!user){
    return null;
  }

  return (
    <div className="flex align-middle rounded-2xl  w-1/2 m-auto">
      <div className="flex flex-row w-[48rem]">
        <div className="rounded form-control bg-slate-900  grow p-6">
          <form onSubmit={onSubmit}>
            <button className="btn btn-primary drawer-button my-6 w-full" type="submit">
              Logout
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}