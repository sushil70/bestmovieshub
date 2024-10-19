/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com", "collection.cloudinary.com"],
  },
  env: {
    REACT_APP_ADMIN_ID: "passwordToAdminPageWhereFixedManCanGo",
    SITE_URL: "https://www.bestmovieshub.fun",
  },
};

export default nextConfig;
