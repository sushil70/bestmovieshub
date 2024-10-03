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

export async function updateMovie(data: any, id: string) {
  try {
    const result = await prisma.allmovies.update({
      where: {
        id,
      },
      data,
    });
    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to update movie:", error);
    return { success: false, error: "Failed to update movie" };
  }
}

export async function switchShow(id: string, show: boolean) {
  try {
    const result = await prisma.allmovies.update({
      where: {
        id,
      },
      data: {
        show,
      },
    });
    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to switch show movie:", error);
    return { success: false, error: "Failed to switch show movie" };
  }
}
