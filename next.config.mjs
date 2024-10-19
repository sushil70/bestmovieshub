/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com", "collection.cloudinary.com"],
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
