"use server";

import { PrismaClient } from "@prisma/client";

export default async function getMovies() {
  let movies: any;
  let error: string | null = null;
  const prisma = new PrismaClient();
  try {
    movies = await prisma.allmovies.findMany();
  } catch (e) {
    error = e instanceof Error ? e.message : "An unexpected error occurred";
  }

  return { movies, error };
}
