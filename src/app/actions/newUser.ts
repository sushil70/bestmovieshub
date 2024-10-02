"use server";

import { PrismaClient } from "@prisma/client";
import moment from "moment";

const prisma = new PrismaClient();
async function addUser(data: any) {
  try {
    const result = await prisma.newUser.create({
      data,
    });
    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to add new user:", error);
  }
}

async function updateUser(id: any) {
  try {
    const result = await prisma.newUser.findUnique({
      where: {
        id,
      },
    });
    console.log("result", result);
    if (moment() > moment(result?.updatedDateTime).add(1, "h") && result) {
      const updateResult = await prisma.newUser.update({
        where: {
          id,
        },
        data: {
          count: result.count + 1,
        },
      });
      return { success: true, data: updateResult };
    }
  } catch (error) {
    console.error("Failed to update new user:", error);
  }
}

export { addUser, updateUser };
