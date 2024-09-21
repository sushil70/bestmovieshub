import UserTable from "@/components/ui/Table";
import { PrismaClient } from "@prisma/client";

export default async function Admin() {
  const prisma = new PrismaClient();

  const movies = await prisma.allmovies.findMany();

  return (
    <main>
      <UserTable data={movies} />
    </main>
  );
}
