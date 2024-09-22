"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function addMovie(data: any) {
  try {
    const result = await prisma.allmovies.create({
      data,
    });
    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to add movie:", error);
    return { success: false, error: "Failed to add movie" };
  }
}
