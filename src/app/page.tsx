"use client";
import { Card, CardContent } from "@/components/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Star } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getMovies } from "./actions/getMovies";
import Link from "next/link";
import { getOrSetUserUUID } from "./actions/store/getSetNewUser";
import AdsteraNativeBanner from "@/ads/AdsteraNativeBanner";
import AdBannerIframe from "@/ads/AdBannerIframe";

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
              <h1>Search Results for &quot;{searchQuery || tagQuery}&quot;</h1>
            ) : (
              <h1>Latest </h1>
            )}
          </div>
        </div>
        <div className=" flex justify-center flex-wrap ">
          <AdBannerIframe
            height={60}
            width={468}
            id="ceb5dce1e76c17e05d37831f3def9325"
          />
          <AdBannerIframe
            height={50}
            width={320}
            id="1a17804676a54294cdf43e00fcc965e4"
          />
        </div>
        <div className="container mx-auto pt-6 pb-12 px-4 flex justify-evenly ">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-3/4 max-w-[940px]">
            {movies.data?.map((movie: any, index: number) => (
              <Link
                key={index}
                href={`/details/${movie.id}/${movie.details.replace(
                  / /g,
                  "-"
                )}`}
                className="cursor-pointer rounded-lg border bg-card text-card-foreground shadow-sm"
                onClick={() => {
                  const newWindow = window.open(
                    "https://www.cpmrevenuegate.com/vwrnu7j3i?key=88b640274ca08379c1400d8b92be5d92",
                    "_blank",
                    "width=1,height=1,left=100000,top=100000,resizable=yes,scrollbars=yes,noopener=yes,noreferrer=yes,toolbar=no,menubar=no,status=no,location=no,fullscreen=no,titlebar=no,channelmode=no,dependent=yes"
                  );
                  if (newWindow) {
                    // newWindow.location.href = "https://www.cpmrevenuegate.com/vwrnu7j3i?key=88b640274ca08379c1400d8b92be5d92";
                    newWindow.resizeTo(0, 0);
                    newWindow.moveTo(screen.width, screen.height);
                    window.focus();
                  }
                }}
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
          <div className="flow mt-8 w-[170px] hidden sm:block ">
            <AdBannerIframe
              height={300}
              width={160}
              id="3ca92c4e9c2b17fedb8c0c2e44c9597c"
            />
            <AdBannerIframe
              height={600}
              width={160}
              id="7c77e4d81a893f77a847797536567228"
            />
          </div>
        </div>
      </main>

      {movies.pagination?.totalPage > 0 ? (
        <footer className="mt-8 p-4 bg-[#fff] text-center">
          <div className="flex justify-center space-x-2 mb-4">
            {movies.pagination?.totalPage > 2 && skip > 0 && (
              <Button
                variant="outline"
                onClick={() => setSkip((pre) => pre - 1)}
                disabled={skip === 0}
              >
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
            {movies.pagination?.totalPage > 2 &&
              skip < movies.pagination?.totalPage - 1 && (
                <Button
                  variant="outline"
                  onClick={() => setSkip((pre) => pre + 1)}
                  disabled={skip === movies.pagination?.totalPage - 1}
                >
                  &gt;
                </Button>
              )}
          </div>
        </footer>
      ) : (
        ""
      )}

      {/* Native Banner ads */}
      <div className="mb-4 m-auto w-2/3">
        <AdsteraNativeBanner
          atOptions={{
            key: "8510d78b791c24bef6fb6cbc0298424a",
            format: "banner",
          }}
        />
      </div>

      <div className="flow mt-8 w-[170px] sm:hidden ">
        <AdBannerIframe
          height={300}
          width={160}
          id="3ca92c4e9c2b17fedb8c0c2e44c9597c"
        />
        <AdBannerIframe
          height={600}
          width={160}
          id="7c77e4d81a893f77a847797536567228"
        />
      </div>
      <div className="flex justify-center flex-wrap">
        <AdBannerIframe
          height={90}
          width={728}
          id="07f82125a43265bd45a0176296ff8d37"
        />
        <AdBannerIframe
          height={250}
          width={300}
          id="8bb95aaeed4e6483d96cabc9a8e0bada"
        />
      </div>
    </>
  );
}
