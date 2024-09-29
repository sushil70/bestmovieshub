"use server";

import { PrismaClient } from "@prisma/client";

export default async function getActors() {
  let actors: any;
  let error: string | null = null;
  const prisma = new PrismaClient();
  try {
    actors = await prisma.actors.findMany();
  } catch (e) {
    error = e instanceof Error ? e.message : "An unexpected error occurred";
  }

  return { actors, error };
}
