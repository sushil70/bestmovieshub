import { PrismaClient } from "@prisma/client";
import Button from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { NextPage } from "next";

const Home: NextPage = async () => {
  const prisma = new PrismaClient();

  const movies = await prisma.allmovies.findMany();

  console.log("data", new Date().toISOString(), movies);

  return (
    <>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map((movie, index) => (
              <div key={index} className="bg-[#222] rounded-lg overflow-hidden">
                <Image
                  src={`https://res.cloudinary.com/dhzisk3o5/image/upload/v1726825410/${movie.profileImage}.jpg`}
                  alt={movie.title}
                  width={300}
                  height={400}
                  className="w-full h-auto"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-2">{movie.title}</h2>
                  <p className="text-sm text-gray-400">{movie.id}</p>
                </div>
              </div>
            ))}
          </div>
        </main>

        <footer className="mt-8 p-4 bg-[#111] text-center">
          <div className="flex justify-center space-x-2 mb-4">
            <Button variant="outline" size="md">
              1
            </Button>
            <Button variant="outline" size="md">
              2
            </Button>
            <Button variant="outline" size="md">
              3
            </Button>
            <Button variant="outline" size="md">
              ...
            </Button>
            <Button variant="outline" size="md">
              866
            </Button>
            <Button variant="outline" size="md">
              Next &gt;
            </Button>
          </div>
          <p className="text-sm text-gray-400">
            2024 © HDHub4u.com | All Rights Reserved.
          </p>
        </footer>
      </div>
    </>
  );
};

export default Home;
