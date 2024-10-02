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
    if (moment().diff(moment(result?.updatedDateTime), "hours") > 1 && result) {
      const updateResult = await prisma.newUser.update({
        where: {
          id,
        },
        data: {
          count: result.count++,
        },
      });
      return { success: true, data: updateResult };
    }
  } catch (error) {
    console.error("Failed to update new user:", error);
  }
}

export { addUser, updateUser };
