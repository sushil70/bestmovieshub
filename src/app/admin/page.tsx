import UserTable from "./Table";
import { PrismaClient } from "@prisma/client";
import { Suspense } from "react";

export default async function Admin() {
  const prisma = new PrismaClient();

  const movies = await prisma.allmovies.findMany({
    orderBy: { updatedDate: "desc" },
  });

  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <UserTable data={movies} />
      </Suspense>
    </main>
  );
}
