declare global {
  // Ensure this is treated as a module by adding an empty export.
  namespace NodeJS {
    interface Global {
      prisma: PrismaClient | undefined;
    }
  }
  type movies = {
    id: string;
    title: string;
    profileImage: string;
    type: "movie" | "series" | "episode";
    images: string[] | null;
    rating: number | null;
    genre: string[] | null;
    year: number | null;
    runtime: string | null;
    languages: string[] | null;
    description: string | null;
    storySummary: string | null;
    actors: string[] | null;
    director: string | null;
    writer: string | null;
    producer: string | null;
    releaseDate: string | null;
    lastupdated: string | null;
    countries: string[] | null;
    details: string | null;
  }[];

  interface Option {
    [key: string]: string;
  }

  type ArraysOfObjects = {
    [key: string]: string | string[] | number | boolean | null;
  };

  type TableProps = {
    data: ArraysOfObjects[];
  };

  interface Global {
    prisma: PrismaClient | undefined;
  }
}

// If this file has no import/export statements, it will be treated as a global declaration.
export {};
