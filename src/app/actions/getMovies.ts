"use server";

import { PrismaClient } from "@prisma/client";

export default async function getMovies({
  page,
  take,
  searchQuery,
}: // cursor,
{
  page: number;
  take: number;
  cursor?: any;
  searchQuery: string;
}) {
  let movies: any;
  let error: string | null = null;
  let total: number | null = 0;
  let nextCursor: any;
  const prisma = new PrismaClient();

  const skip = (page || 1 - 1) * take;

  try {
    [movies, total] = await Promise.all([
      prisma.allmovies.findMany({
        select: {
          id: true,
          title: true,
          details: true,
          rating: true,
          profileImage: true,
          genre: true,
        },
        where: {
          OR: [
            {
              title: { contains: searchQuery, mode: "insensitive" },
            },
            {
              details: { contains: searchQuery, mode: "insensitive" },
            },
          ],
        },
        skip,
        take,
        // cursor: cursor ? { id: cursor.id } : undefined,
        orderBy: {
          updatedDate: "desc",
        },
      }),
      prisma.allmovies.count(),
    ]);
    // const lastMovies = movies[movies.length - 1];
    // nextCursor = lastMovies ? { id: lastMovies.id } : undefined;
  } catch (e) {
    error = e instanceof Error ? e.message : "An unexpected error occurred";
  }

  return {
    movies,
    error,
    nextCursor,
    pagination: {
      totalCount: total,
      page,
      limit: take,
      totalPage: Math.ceil(total / take),
    },
  };
}
