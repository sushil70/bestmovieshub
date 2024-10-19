const { MongoClient } = require("mongodb");

module.exports = {
  siteUrl: process.env.SITE_URL || "https://www.bestmovieshub.fun",
  generateRobotsTxt: true, // (optional)
  exclude: ["/admin"], // (optional) Exclude specific pages
  // Add dynamic routes by fetching data from an API or database
  additionalPaths: async () => {
    const client = new MongoClient(process.env.DATABASE_URL);

    try {
      await client.connect();
      const db = client.db("movies");
      const moviesCollection = db.collection("allmovies");

      // Fetch all movies (or your dynamic content)
      const movies = await moviesCollection.find({ show: true }).toArray();

      // Map each movie to its corresponding URL path
      return movies.map((movie) => ({
        loc: `/details/${movie._id}/${movie.details.replace(/ /g, "-")}`, // Use the appropriate field for dynamic URL
        changefreq: "daily",
        priority: 0.8,
        lastmod: new Date().toISOString(),
      }));
    } finally {
      await client.close();
    }
  },
};
