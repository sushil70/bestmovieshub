"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function addMovie(data: FormData) {
  try {
    const result = await prisma.allmovies.create({
      data: {
        title: data.get("title") as string,
        profileImage: data.get("profileImage") as string,
        type: data.get("type") as string,
      },
    });
    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to add movie:", error);
    return { success: false, error: "Failed to add movie" };
  }
}
