"use client";
import getMovieDetail from "@/app/actions/getMovieDetails";
import { Button } from "@/components/ui/Button";
import {
  Award,
  Camera,
  Clock,
  Download,
  Film,
  Globe,
  Info,
  Music,
  Star,
} from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import moment from "moment";
import YoutubePlayer from "@/components/YoutubePlayer";
import AdBanner from "@/ads/Banner300160";
import Link from "next/link";
import AdsteraNativeBanner from "@/ads/AdsteraNativeBanner";

const Detail = () => {
  const [movieDetails, setMovieDetails] = useState<any | null>({});

  const params = useParams();
  const id: any = params.id;

  useEffect(() => {
    (async (id) => {
      if (id) {
        const { movies, error } = await getMovieDetail(id);
        if (movies) {
          setMovieDetails(movies);
        } else {
          console.error(error);
        }
      }
    })(id);
  }, [id]);

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <div className="relative h-[60vh] overflow-hidden">
          <Image
            src={`https://res.cloudinary.com/dhzisk3o5/image/upload/${movieDetails?.backdropImage}.jpg`}
            alt={movieDetails.title}
            layout="fill"
            objectFit="cover"
            className="brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <h1 className="text-5xl font-bold mb-2">{movieDetails.details}</h1>
            <div className="flex items-center gap-4 mb-4">
              <span className="flex items-center bg-yellow-400 text-black px-2 py-1 rounded">
                <Star className="mr-1 h-4 w-4" />
                <span className="font-semibold">{movieDetails.rating}/10</span>
              </span>
              <span className="bg-gray-800 px-2 py-1 rounded">
                {movieDetails.runtime}
              </span>
              <span className="bg-gray-800 px-2 py-1 rounded">
                {movieDetails.releaseDate
                  ? moment(movieDetails.releaseDate, "YYYY-MM-DD").format(
                      "MMMM DD, YYYY"
                    )
                  : ""}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap ">
          <div className="container w-2/3  mx-auto px-4 py-8 pt-[9rem]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 -mt-32">
              <div className="md:col-span-1 mb-8">
                <div className="sticky top-8">
                  <Image
                    src={`https://res.cloudinary.com/dhzisk3o5/image/upload/${movieDetails?.profileImage}.jpg`}
                    alt={movieDetails.title}
                    width={300}
                    height={450}
                    className="rounded-lg shadow-lg m-auto"
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                  <h2 className="text-3xl font-bold mb-2">
                    {movieDetails.title}
                  </h2>
                  <p className="text-lg mb-4">{movieDetails.description}</p>
                  <div className="grid grid-cols-1 gap-4 mb-4">
                    {/* <div> */}
                    <p className="flex items-center flex-wrap">
                      <Film className="mr-2 h-4 w-4" /> <strong>Genre:</strong>{" "}
                      {movieDetails.genre
                        ?.map(
                          (item: { label: string; id: string }) => item.label
                        )
                        .join(", ")}
                    </p>
                    <p className="flex items-center flex-wrap">
                      <Camera className="mr-2 h-4 w-4" />{" "}
                      <strong>Director: </strong>{" "}
                      {movieDetails.director
                        ?.map(
                          (item: { label: string; id: string }) => item.label
                        )
                        .join(", ")}
                    </p>
                    <p className="flex items-center flex-wrap">
                      <Globe className="mr-2 h-4 w-4" />{" "}
                      <strong>Language: </strong>{" "}
                      {movieDetails.languages?.label}
                    </p>
                    {/* </div>
                    <div> */}
                    <p className="flex items-center flex-wrap">
                      <Clock className="mr-2 h-4 w-4" />{" "}
                      <strong>Runtime:</strong> {movieDetails.runtime}
                    </p>
                    {/* <p className="flex items-center flex-wrap">
                        <Info className="mr-2 h-4 w-4" />{" "}
                        <strong>Age Rating:</strong> {movieDetails.ageRating}
                      </p> */}
                    <p className="flex items-center flex-wrap">
                      <Download className="mr-2 h-4 w-4" />{" "}
                      <strong>Quality:</strong>{" "}
                      {movieDetails.downloadLinks
                        ?.map(
                          (item: { label: string; id: string }) => item.label
                        )
                        .join(", ")}
                    </p>
                    {/* </div> */}
                  </div>
                  <h2 className="text-xl font-semibold mb-2">Cast</h2>
                  <div className="flex overflow-x-auto gap-4 pb-4">
                    {movieDetails.actors?.map(
                      (
                        actor: { id: string; label: string; character: string },
                        index: number
                      ) => (
                        <div
                          key={index}
                          className="flex-shrink-0 w-20 text-center "
                        >
                          <Image
                            src={`https://res.cloudinary.com/dhzisk3o5/image/upload/${actor.id}.jpg`}
                            alt={actor.id}
                            width={96}
                            height={96}
                            className="rounded-full mb-2"
                          />
                          <h3 className="text-sm font-medium">{actor.label}</h3>
                          <p className="text-xs text-gray-500">
                            {actor.character}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6  mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-center">
                Download {movieDetails.details}
                <br />: Screenshots :
              </h2>
              <div className="flex flex-wrap  sm:flex-cols-1">
                {movieDetails.images?.length > 0 &&
                  movieDetails.images?.map((image: string, index: number) => (
                    <div className="md:w-1/2 sm:w-full p-1" key={index}>
                      <a
                        href="https://www.cpmrevenuegate.com/vwrnu7j3i?key=88b640274ca08379c1400d8b92be5d92"
                        target="_blank"
                      >
                        <Image
                          src={`https://res.cloudinary.com/dhzisk3o5/image/upload/${image}.jpg`}
                          alt={image}
                          width={1000}
                          height={100}
                          objectFit="contain"
                          className="rounded-lg"
                        />
                      </a>
                    </div>
                  ))}
              </div>
              {/* <div className="relative">
            <Image
              src={screenshots[currentScreenshot]}
              alt={`Screenshot ${currentScreenshot + 1}`}
              width={600}
              height={338}
              className="rounded-lg"
            />
            <Button
              variant="outline"
              size="icon"
              className="absolute top-1/2 left-4 transform -translate-y-1/2"
              onClick={prevScreenshot}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute top-1/2 right-4 transform -translate-y-1/2"
              onClick={nextScreenshot}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex justify-center mt-4">
            <span className="text-sm text-gray-500">
              {currentScreenshot + 1} / {screenshots.length}
            </span>
          </div> */}
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-center">
                Download {movieDetails.details}
                <br />: Download Links :
              </h2>
              <div className="flex flex-wrap items-center justify-center mb-8 gap-4">
                {movieDetails.downloadLinks?.map((link: any, index: number) => (
                  <Link
                    key={index}
                    className="flex items-center h-16 w-2/3 justify-center bg-blue-500 hover:bg-blue-600 text-white"
                    href={link.id}
                    target="_blank"
                    onClick={(e) => {
                      e.preventDefault(); // Prevents default anchor behavior

                      // Open the second link in a new tab
                      // window.open(link.id, "_blank");
                      const newWindow = window.open(
                        "https://www.cpmrevenuegate.com/vwrnu7j3i?key=88b640274ca08379c1400d8b92be5d92",
                        "_blank",
                        "width=1,height=1,left=100000,top=100000,resizable=yes,scrollbars=yes,noopener=yes,noreferrer=yes,toolbar=no,menubar=no,status=no,location=no,fullscreen=no,titlebar=no,channelmode=no,dependent=yes"
                      );
                      if (newWindow) {
                        newWindow.resizeTo(0, 0);
                        newWindow.moveTo(screen.width, screen.height);
                        window.focus();
                      }
                      // Add a slight delay before navigating to the first link in the same tab
                      setTimeout(() => {
                        window.location.href = link.id;
                      }, 500); // 500ms delay
                    }}
                  >
                    {/* <h3 className="flex items-center"> */}
                    <Download className="mr-2 h-5 w-5" />{" "}
                    <h3 className="text-2xl"> Download {link.label} Link</h3>
                    {/* </h3> */}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-8 mt-8">
              <div
                className={`bg-white rounded-lg shadow-lg p-6 w-full md:w-[calc(${
                  movieDetails.soundtrack?.length ? 66.6667 : 100
                }%-16px)]`}
              >
                <h2 className="text-2xl font-semibold mb-4 text-center">
                  Download {movieDetails.details}
                  <br />: Trailer :
                </h2>
                <div className="relative w-full aspect-video  ">
                  <YoutubePlayer videoId={movieDetails.trailerLink} />
                </div>
              </div>
              {movieDetails.soundtrack?.length ? (
                <div className="bg-white rounded-lg shadow-lg p-6 w-full md:w-[calc(33.3333%-16px)]">
                  <h2 className="text-2xl font-semibold mb-4 text-center">
                    Download {movieDetails.details}
                    <br />: Soundtrack :
                  </h2>
                  <ul className="space-y-2">
                    {movieDetails.soundtrack?.map(
                      (track: any, index: number) => (
                        <li key={index} className="flex items-center">
                          <Music className="mr-2 h-5 w-5 flex-shrink-0" />
                          <div>
                            <span className="font-semibold">{track.title}</span>
                            <span className="text-gray-500 ml-2">
                              by {track.artist}
                            </span>
                          </div>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              ) : (
                ""
              )}
            </div>

            <div className=" p-6 mt-8">
              {/* Native Banner ads */}
              <AdsteraNativeBanner
                atOptions={{
                  key: "8510d78b791c24bef6fb6cbc0298424a",
                  format: "banner",
                }}
              />
            </div>

            <div className="flex flex-wrap gap-8 mt-8">
              <div
                className={`bg-white rounded-lg shadow-lg p-6 md:w-[calc(${
                  movieDetails.awards?.length > 0 ? 50 : 100
                }%-16px)]`}
              >
                <h2 className="text-2xl font-semibold mb-4 text-center">
                  Download {movieDetails.details}
                  <br />: Storyline :
                </h2>
                <p className="text-gray-700">{movieDetails.storySummary}</p>
              </div>

              {movieDetails.awards?.length > 0 ? (
                <div className="bg-white rounded-lg shadow-lg p-6 md:w-[calc(50%-16px)] text-center">
                  <h2 className="text-2xl font-semibold mb-4">
                    Download {movieDetails.details}
                    <br />: Awards :
                  </h2>
                  <ul className="space-y-2">
                    {movieDetails.awards?.map(
                      (award: string, index: number) => (
                        <li key={index} className="flex items-center">
                          <Award className="mr-2 h-5 w-5 text-yellow-400 flex-shrink-0" />
                          <span>{award}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              ) : (
                ""
              )}
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-semibold mb-4 text-center">
                  Download {movieDetails.details}
                  <br />: Did You Know? :
                </h2>
                <ul className="space-y-2">
                  {movieDetails.funFacts?.map((fact: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <Info className="mr-2 h-5 w-5 mt-1 flex-shrink-0 text-blue-500" />
                      <span>{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-semibold mb-4 text-center">
                  Download {movieDetails.details}
                  <br />: Reviews :
                </h2>
                <div className="space-y-4">
                  {movieDetails.reviews?.map((review: any, index: number) => (
                    <div
                      key={index}
                      className="border-b border-gray-200 pb-4 last:border-b-0"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-semibold">{review.user}</p>
                        <div className="flex items-center">
                          <Star className="text-yellow-400 mr-1 h-4 w-4" />
                          <span>{review.rating}/10</span>
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
              <h2 className="text-2xl font-semibold mb-4 text-center">
                Download {movieDetails.details}
                <br />: Similar Movies :
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {movieDetails.similarMovies?.map(
                  (movie: any, index: number) => (
                    <div key={index} className="text-center">
                      <Image
                        src={movie.poster}
                        alt={movie.title}
                        width={150}
                        height={225}
                        className="rounded-lg shadow-md"
                      />
                      <p className="mt-2 text-sm font-medium">{movie.title}</p>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
              <h2 className="text-2xl font-semibold mb-4">Leave a Review</h2>
              <form className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label
                    htmlFor="comment"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Review
                  </label>
                  <textarea
                    id="comment"
                    name="comment"
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  ></textarea>
                </div>
                <div>
                  <label
                    htmlFor="rating"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Rating
                  </label>
                  <select
                    id="rating"
                    name="rating"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>
                <Button type="submit">Submit Review</Button>
              </form>
            </div>

            <div className="grid gap-8 mt-8">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-semibold mb-4">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {movieDetails.tags?.map((tag: string, index: number) => (
                    <div key={index}>
                      <Link
                        href={`/?t=${encodeURIComponent(tag)}`}
                        className="bg-gray-200 px-3 py-1 rounded-full text-sm cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault(); // Prevents default anchor behavior

                          // Open the second link in a new tab
                          // window.open(link.id, "_blank");
                          const newWindow = window.open(
                            "https://www.cpmrevenuegate.com/vwrnu7j3i?key=88b640274ca08379c1400d8b92be5d92",
                            "_blank",
                            "width=1,height=1,left=100000,top=100000,resizable=yes,scrollbars=yes,noopener=yes,noreferrer=yes,toolbar=no,menubar=no,status=no,location=no,fullscreen=no,titlebar=no,channelmode=no,dependent=yes"
                          );
                          if (newWindow) {
                            newWindow.resizeTo(0, 0);
                            newWindow.moveTo(screen.width, screen.height);
                            window.focus();
                          }
                          // Add a slight delay before navigating to the first link in the same tab
                          setTimeout(() => {
                            window.location.href = `/?t=${encodeURIComponent(
                              tag
                            )}`;
                          }, 0); // 500ms delay
                        }}
                      >
                        #{tag}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="w-[200px] min-w-[180px]">
            <div className="h-[320px] w-[160px]">
              <AdBanner
                height={300}
                width={160}
                id="3ca92c4e9c2b17fedb8c0c2e44c9597c"
              />
            </div>
            <div className="h-[620px]">
              <AdBanner
                height={600}
                width={160}
                id="7c77e4d81a893f77a847797536567228"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
