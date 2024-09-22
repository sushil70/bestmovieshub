"use server";

import { PrismaClient } from "@prisma/client";

export default async function getMovieDetail(id: string) {
  let movies: any;
  let error: string | null = null;
  const prisma = new PrismaClient();
  console.log("movies id", id);
  try {
    movies = await prisma.allmovies.findUnique({ where: { id } });
    console.log("movies movies", movies);
  } catch (e) {
    error = e instanceof Error ? e.message : "An unexpected error occurred";
  }

  return { movies, error };
}
