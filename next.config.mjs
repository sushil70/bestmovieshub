/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com", "collection.cloudinary.com"],
    minimumCacheTTL: 60 * 60 * 24, // 1 day
  },
  env: {
    REACT_APP_ADMIN_ID: "passwordToAdminPageWhereFixedManCanGo",
    SITE_URL: "https://www.bestmovieshub.fun",
  },
  async headers() {
    return [
      {
        source: "/(robots.txt|sitemap.xml)",
        headers: [
          {
            key: "Content-Type",
            value: "application/xml",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
