"use client";
import { getAuth, updateProfile } from "firebase/auth";
import { useAuth } from "@/app/lib/AuthContext";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function UserProfile() {
  const { user } = useAuth();
  const auth = getAuth();
  const [error, setError] = useState(""); // Stan do przechowywania błędów

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      displayName: user?.displayName || "",
      email: user?.email || "",
      photoURL: user?.photoURL || "",
    },
  });

  const onSubmit = (data) => {
    updateProfile(auth.currentUser, {
      displayName: data.displayName,
      photoURL: data.photoURL,
    })
      .then(() => {
        console.log("Profil zaktualizowany");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Profil użytkownika</h1>
        
        {error && (
          <div className="alert alert-error mb-4 bg-red-100 text-red-600 p-4 rounded">
            <p>{error}</p>
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Pole displayName */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Nazwa użytkownika</label>
            <input
              type="text"
              className="input w-full border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nazwa użytkownika"
              {...register("displayName", {
                required: "Nazwa użytkownika jest wymagana",
                maxLength: {
                  value: 50,
                  message: "Nazwa użytkownika jest za długa",
                },
              })}
            />
            {errors.displayName && (
              <p className="text-sm text-red-600 mt-1">{errors.displayName.message}</p>
            )}
          </div>

          {/* Pole email (tylko do odczytu) */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              className="input w-full border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              readOnly
              value={user?.email || ""}
            />
          </div>

          {/* Pole photoURL */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Adres zdjęcia profilowego</label>
            <input
              type="text"
              className="input w-full border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Adres zdjęcia profilowego"
              {...register("photoURL", {
                pattern: {
                  value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/,
                  message: "Niepoprawny adres URL zdjęcia",
                },
              })}
            />
            {errors.photoURL && (
              <p className="text-sm text-red-600 mt-1">{errors.photoURL.message}</p>
            )}
          </div>

          {/* Przycisk zapisu */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg transition duration-200 mt-4"
          >
            Zapisz
          </button>
        </form>
      </div>
    </div>
  );
}
