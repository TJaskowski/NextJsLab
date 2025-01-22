"use client";
import { useAuth } from "@/app/lib/AuthContext";
import { use, useEffect, useState } from "react";
import { db } from "@/app/lib/firebase";
import { doc, collection, query, where, getDocs } from "firebase/firestore";

export default function UserArcticles() {
    const { user } = useAuth();
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchArticles = async () => {
            if (!user?.uid) {
                return;
            }   
            try {
                if (user?.uid) {
                    const userRef = doc(db, "users", user.uid);
                    const articlesRef = collection(db, "articles");
                    const q = query(articlesRef, where("user", "==", userRef));
                    const querySnapshot = await getDocs(q);
                    const fetchedArticles = querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));    
                    setArticles(fetchedArticles);
                }
            } catch (e) {
                console.error("Error getting document:", e);
                setError("Wystąpił błąd podczas pobierania danych z Firestore.");
            } finally {
                setIsLoading(false);
            }
        };  
        fetchArticles();
    }, [user?.uid]);

    if(isLoading){
        return <p>Ładowanie...</p>
    }
    if(error){
        return <p>{error}</p>
    }

    return(
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4 text-gray-800">Twoje Artykuły</h1>
            {articles.length === 0 ? (
                <p className="text-gray-800">Brak artykułów do wyświetlenia.</p>
            ) : (
                <ul className="space-y-4">
                    {articles.map((article) => (
                        <li key={article.id} className="p-4 bg-white shadow rounded">
                            <h2 className="text-xl font-bold">{article.title}</h2>
                            <p className="text-gray-800">{article.content}</p>
                        </li>))}
                </ul>)}
        </div>

    );
}