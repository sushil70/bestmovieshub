"use client";
import { Card, CardContent } from "@/components/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Star } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import getMovies from "./actions/getMovies";
import AdBanner from "@/ads/Banner300160";
import Link from "next/link";
import { getOrSetUserUUID } from "./actions/store/getSetNewUser";

export default function Home() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("s");
  const tagQuery = searchParams.get("t");

  const [movies, setMovies] = useState<any | null>([]);
  const [error, setError] = useState<string | null>(null);
  const [skip, setSkip] = useState(0);

  console.log(error);

  useEffect(() => {
    (async () => {
      console.log("searchQuery", searchQuery, tagQuery);
      const {
        movies: data,
        error,
        pagination,
      } = await getMovies({
        take: 10,
        page: skip,
        searchQuery: searchQuery || "",
        tagQuery: tagQuery || "",
      });
      console.log("movies", data, pagination);
      setMovies({ data: data, pagination });
      setError(error);
    })();
  }, [skip, searchQuery, tagQuery]);

  useEffect(() => {
    getOrSetUserUUID();
  }, []);

  return (
    <>
      <main className="  ">
        <div className="h-[100px] max-w-[1536px]  w-full container m-auto px-4 mt-4 bg-slate-300 flex items-center ">
          <div className="text-3xl  font-bold  text-gray-900">
            {searchQuery || tagQuery ? (
              <h1>Search Results for {searchQuery || tagQuery}</h1>
            ) : (
              <h1>Latest </h1>
            )}
          </div>
        </div>
        <div className="container mx-auto pt-6 pb-12 px-4 flex justify-evenly">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-3/4 max-w-[940px]">
            {movies.data?.map((movie: any, index: number) => (
              <Link
                key={index}
                href={`/details/${movie.id}/${movie.details.replace(
                  / /g,
                  "-"
                )}`}
                className="cursor-pointer rounded-lg border bg-card text-card-foreground shadow-sm"
              >
                <Card className="cursor-pointer overflow-hidden transition-transform hover:scale-105">
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
                    <h2 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">
                      {movie.details}
                    </h2>
                    <div className="flex flex-wrap items-center mb-2">
                      {movie.genre?.map(
                        (
                          genre: { label: string; id: string },
                          index: number
                        ) => (
                          <Badge variant="outline" key={index}>
                            <h4>{genre.label}</h4>
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
                        <h5>{movie.rating}</h5>
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="flex flex-wrap mt-8 w-[180px] ">
            {/* <div>
              <AdBanner
                height={600}
                width={160}
                id="66e9e17ceba1bcaadbf610fdca51e477"
              />
            </div> */}
            <div>
              <AdBanner
                height={300}
                width={160}
                id="8858a57973b8ec41f6cf2680f8148d23"
              />
            </div>
          </div>
        </div>
      </main>
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
    </>
  );
}
