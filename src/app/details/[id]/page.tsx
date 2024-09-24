"use client";

import getMovieDetail from "@/app/actions/getMovieDetails";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Badge, Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Detail = () => {
  const [movieDetails, setMovieDetails] = useState<any | null>(null);

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
      <div className="min-h-screen bg-black text-white">
        <main className="container mx-auto p-4">
          <Link
            href="/"
            className="inline-flex items-center text-blue-400 hover:underline mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Movies
          </Link>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <Image
                src={`https://res.cloudinary.com/dhzisk3o5/image/upload/v1726825410/${movieDetails?.profileImage}.jpg`}
                alt={movieDetails?.title}
                width={400}
                height={600}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            <div className="md:col-span-2 space-y-4">
              <h1 className="text-3xl font-bold">{movieDetails?.title}</h1>
              <div className="flex flex-wrap gap-2">
                {movieDetails?.genre?.map((g: any, index: number) => (
                  //   <Badge key={index} variant="secondary"  >
                  //     {g}
                  //   </Badge>
                  <Badge key={index}>{g.label}</Badge>
                ))}
              </div>
              <p>
                <strong>Language:</strong> {movieDetails?.languages?.label}
              </p>
              <p>
                <strong>Quality:</strong> {movieDetails?.quality}
              </p>
              <p>
                <strong>Size:</strong> {movieDetails?.size}
              </p>
              <p>
                <strong>Added Date:</strong>{" "}
                {movieDetails?.createdDate?.toDateString()}
              </p>
              <p>
                <strong>Director:</strong>{" "}
                {movieDetails?.director?.map((d: any) => d.label).join(" | ")}
              </p>
              <p>
                <strong>Cast:</strong>{" "}
                {movieDetails?.actors?.map((d: any) => d.label).join(" | ")}
              </p>
              <p className="text-gray-300">{movieDetails?.description}</p>

              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Download Options</h2>
                <div className="space-y-4">
                  {movieDetails?.downloadOptions?.map(
                    (option: any, index: number) => (
                      <Button
                        key={index}
                        className="w-full sm:w-auto"
                        variant="outline"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download {option.quality} ({option.size})
                      </Button>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Detail;
