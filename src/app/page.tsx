"use client";
import Button from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import getMovies from "./actions/getMovies";
// import { prisma } from "@/lib/prisma";
// import { Button } from "@/components/ui/button";

// export const revalidate = 60 * 5;

// async function getMovies(): Promise<Movie[]> {
//   try {
//     return await prisma.allmovies.findMany();
//   } catch (error) {
//     console.error("Failed to fetch movies:", error);
//     throw new Error("Failed to fetch movies. Please try again later.");
//   }
// }

export default function Home() {
  const [movies, setMovies] = useState<any | null>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { movies, error } = await getMovies();
      console.log("movies", movies);
      // console.log("JSON.parse(movies)", await JSON.parse(movies));
      setMovies(movies);
      setError(error);
    })();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="p-4 bg-[#111]">
        <nav className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-red-600">
            Best Movies Hub
          </Link>
          <div className="space-x-4">
            <Link href="#" className="hover:text-blue-400">
              Disclaimer
            </Link>
            <Link href="#" className="hover:text-blue-400">
              How To Download ?
            </Link>
            <Link href="#" className="hover:text-blue-400">
              Join Our Group !
            </Link>
            <Link href="#" className="hover:text-blue-400">
              Movie Request Page
            </Link>
          </div>
        </nav>
      </header>

      <main className="container mx-auto p-4">
        {error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.isArray(movies) && movies.length > 0
              ? movies.map((movie: any) => (
                  <div
                    key={movie.id}
                    className="bg-[#222] rounded-lg overflow-hidden"
                  >
                    <Image
                      src={`https://res.cloudinary.com/dhzisk3o5/image/upload/v1726825410/${movie.profileImage}.jpg`}
                      alt={movie.title}
                      width={300}
                      height={400}
                      className="w-full h-auto"
                    />
                    <div className="p-4">
                      <h2 className="text-lg font-semibold mb-2">
                        {movie.title}
                      </h2>
                      <p className="text-sm text-gray-400">{movie.id}</p>
                    </div>
                  </div>
                ))
              : ""}
          </div>
        )}
      </main>

      <footer className="mt-8 p-4 bg-[#111] text-center">
        <div className="flex justify-center space-x-2 mb-4">
          <Button variant="outline" size="sm">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <Button variant="outline" size="sm">
            ...
          </Button>
          <Button variant="outline" size="sm">
            866
          </Button>
          <Button variant="outline" size="sm">
            Next &gt;
          </Button>
        </div>
      </footer>
    </div>
  );
}
