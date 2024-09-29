"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function addActors(data: any) {
  try {
    const result = await prisma.actors.createMany({
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
    console.error("Failed to add Actors:", error);
    return { success: false, error: "Failed to add Actors" };
  }
}
