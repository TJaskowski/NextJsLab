"use client";

import { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useAuth } from "@/app/lib/AuthContext";
import Link from "next/link";

export default function VerifyEmail() {
  const { user } = useAuth();
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const auth = getAuth();

    // Zapamiętanie adresu e-mail przed wylogowaniem
    if (user?.email) {
      setUserEmail(user.email);
    }

    // Wylogowanie użytkownika
    signOut(auth).then(() => {
      console.log("User signed out due to email verification required.");
    }).catch((error) => {
      console.error("Error signing out:", error.message);
    });
  }, [user]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
        <h1 className="text-center text-2xl font-bold text-gray-800 mb-4">Wymagana weryfikacja adresu e-mail</h1>
        
        <p className="mt-4 text-gray-700">
          Twój adres e-mail <strong>{userEmail}</strong> nie został zweryfikowany. Proszę kliknij w link wysłany na ten adres, aby zweryfikować e-mail.
        </p>

        <p className="mt-2 text-sm text-gray-500">
          Zostałeś wylogowany z powodu wymogu weryfikacji e-mail. Proszę zweryfikować adres e-mail, a następnie zalogować się ponownie.
        </p>

        <div className="mt-6 text-center">
         <Link href="/" passHref className="text-blue-600 hover:text-blue-800 font-semibold">
            Powrót do strony głównej
        </Link>
        </div>
      </div>
    </div>
  );
}
