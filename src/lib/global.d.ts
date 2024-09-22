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
    genre: object[] | null;
    year: number | null;
    runtime: string | null;
    languages: object | null;
    description: string | null;
    storySummary: string | null;
    actors: object[] | null;
    director: object[] | null;
    writer: object[] | null;
    producer: object[] | null;
    releaseDate: string | null;
    lastupdated: string | null;
    countries: string[] | null;
    details: string | null;
    createdDate: Date;
    updatedDate: Date;
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
