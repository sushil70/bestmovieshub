"use client";
import { Card, CardContent } from "@/components/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Star } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import getMovies from "./actions/getMovies";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("s");

  const [movies, setMovies] = useState<any | null>([]);
  const [error, setError] = useState<string | null>(null);
  const [skip, setSkip] = useState(0);

  console.log(error);

  useEffect(() => {
    (async () => {
      const {
        movies: data,
        error,
        pagination,
        // nextCursor,
      } = await getMovies({
        take: 10,
        page: skip,
        // cursor: movies.nextCursor || null,
        searchQuery: query || "",
      });
      console.log("movies", data, pagination);
      setMovies({ data: data, pagination });
      // setMovies({ data: data, pagination, nextCursor });
      setError(error);
    })();
  }, [skip, query]);

  const handleItemClick = (id: number) => {
    router.push(`/details/${id}`);
  };

  const handleKeyDown = (event: React.KeyboardEvent, id: number) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleItemClick(id);
    }
  };

  return (
    <>
      {/* // <div className="min-h-screen bg-gray-50">
      // <header className="bg-white shadow-sm">
      //   <div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center">
      //     <h1 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">
      //       CineVault
      //     </h1>
      //     <Input
      //       type="search"
      //       placeholder="Search movies..."
      //       className="max-w-xs"
      //       value={searchTerm}
      //       onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
      //         setSearchTerm(e.target.value)
      //       }
      //     />
      //   </div>
      // </header> */}

      <main className="  ">
        <div className="h-[100px] max-w-[1536px]  w-full container m-auto px-4 mt-4 bg-slate-300 flex items-center ">
          <div className="text-3xl  font-bold  text-gray-900">
            {query ? `Search Results for "${query}"` : "Latest"}
          </div>
        </div>
        <div className="container mx-auto pt-6 pb-12 px-4 flex justify-evenly">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-3/4 max-w-[940px]">
            {movies.data?.map((movie: any, index: number) => (
              <Card
                key={index}
                className="cursor-pointer overflow-hidden transition-transform hover:scale-105"
                onClick={() => handleItemClick(movie.id)}
                onKeyDown={(e) => handleKeyDown(e, movie.id)}
              >
                {/* <div className="relative">
                <img
                  src={movie.profileImage}
                  alt={movie.title}
                  className="w-full h-80 object-cover"
                /></div> */}
                <div
                  key={movie.id}
                  className="bg-[#222] rounded-lg overflow-hidden"
                >
                  <Image
                    src={`https://res.cloudinary.com/dhzisk3o5/image/upload/${movie.profileImage}.jpg`}
                    alt={movie.title}
                    width={300}
                    height={400}
                    className="w-full h-80 object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">
                    {movie.details}
                  </h3>
                  <div className="flex flex-wrap items-center mb-2">
                    {movie.genre?.map(
                      (genre: { label: string; id: string }, index: number) => (
                        <Badge variant="outline" key={index}>
                          {genre.label}
                        </Badge>
                      )
                    )}
                    {/* <span className="text-sm text-gray-600 dark:text-gray-400">
                    {movie.year}
                  </span> */}
                  </div>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 mr-1" />
                    <span className="text-gray-700 dark: text-gray-300">
                      {movie.rating}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="flex justify-center mt-8 w-1/4">
            {/* <Button
              variant="outline"
              size="sm"
              onClick={() => setSkip(skip - 10)}
              disabled={skip === 0}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSkip(skip + 10)}
              disabled={skip >= movies?.pagination?.total}
            >
              Next
            </Button> */}
          </div>
        </div>
      </main>

      {/* <main className="container mx-auto p-4">
        {error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.isArray(movies.data) && movies.data?.length > 0
              ? movies.data?.map((movie: any) => (
                  <div
                    key={movie.id}
                    className="bg-[#222] rounded-lg overflow-hidden"
                    onClick={() => handleItemClick(movie.id)}
                    onKeyDown={(e) => handleKeyDown(e, movie.id)}
                  >
                    <Image
                      src={`https://res.cloudinary.com/dhzisk3o5/image/upload/${movie.profileImage}.jpg`}
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
      </main> */}
      {movies.pagination?.totalPage > 0 ? (
        <footer className="mt-8 p-4 bg-[#fff] text-center">
          <div className="flex justify-center space-x-2 mb-4">
            {movies.pagination?.totalPage > 2 && (
              <Button variant="outline" onClick={() => setSkip(0)}>
                &lt;
              </Button>
            )}
            {Array.from({ length: movies.pagination?.totalPage }, (_, i) => (
              <Button
                variant={i !== skip ? "outline" : "default"}
                onClick={() => {
                  setSkip(i);
                }}
                key={i}
              >
                {i + 1}
              </Button>
            ))}
            {movies.pagination?.totalPage > 2 && (
              <Button
                variant="outline"
                onClick={() => setSkip(movies.pagination?.totalPage)}
              >
                &gt;
              </Button>
            )}
          </div>
        </footer>
      ) : (
        ""
      )}
      {/* // </div> */}
    </>
  );
}
