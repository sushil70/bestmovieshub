"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function addDirector(data: any) {
  try {
    const result = await prisma.director.createMany({
      data,
    });
    return { success: true, data: result };
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("Unique constraint failed on the fields: (`id`)")
    ) {
      return { success: false, error: "ID already exists" };
    }
    console.error("Failed to add Director:", error);
    return { success: false, error: "Failed to add Director" };
  }
}

async function getDirector() {
  let director: any;
  let error: string | null = null;
  const prisma = new PrismaClient();
  try {
    director = await prisma.director.findMany();
  } catch (e) {
    error = e instanceof Error ? e.message : "An unexpected error occurred";
  }

  return { director, error };
}

export { addDirector, getDirector };
