/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com", "collection.cloudinary.com"],
  },
  env: {
    REACT_APP_ADMIN_ID: "passwordToAdminPageWhereFixedManCanGo",
  },
};

export default nextConfig;
