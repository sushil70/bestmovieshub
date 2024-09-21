/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  env: {
    REACT_APP_ADMIN_ID: "passwordToAdminPageWhereFixedManCanGo",
  },
};

export default nextConfig;
