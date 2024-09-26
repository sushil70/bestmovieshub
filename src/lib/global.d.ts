declare global {
  // Ensure this is treated as a module by adding an empty export.
  namespace NodeJS {
    interface Global {
      prisma: PrismaClient | undefined;
    }
  }
  type Movies = {
    id: string;
    title: string;
    profileImage: string;
    backdropImage: string;
    type: "movie" | "series" | "episode";
    images: string[] | null;
    rating: string | null;
    runtime: string | null;
    description: string | null;
    storySummary: string | null;
    releaseDate: string | null;
    genre: object[] | null;
    year: string | null;
    languages: object | null;
    actors: { label: string; name: string; character: string }[];
    director: object[] | null;
    writer: object[] | null;
    producer: object[] | null;
    lastupdated: string | null;
    details: string | null;
    createdDate: Date;
    updatedDate: Date;
    downloadLinks: { quality: string; link: string }[];
    trailerLink: string;
    reviews: { user: string; comment: string; rating: number }[];
    tags: string[];
    ageRating: string;
    awards: string[];
    soundtrack: { title: string; artist: string }[];
    funFacts: string[];
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
