"use server";

import { PrismaClient } from "@prisma/client";

export default async function addRequest(data: any) {
  let result: any;
  let error: string | null = null;
  const prisma = new PrismaClient();

  try {
    result = await prisma.requests.create({
      data,
    });
    return { success: true, data: result };
  } catch (e) {
    error = e instanceof Error ? e.message : "An unexpected error occurred";
  }

  return { result, error };
}
