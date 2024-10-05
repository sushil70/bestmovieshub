"use client";

import AdBanner from "@/ads/Banner300160";

export default function Footer() {
  return (
    <footer className="bg-white shadow-sm mt-auto">
      <div>
        <AdBanner
          height={90}
          width={728}
          id="3dfc2513e4419023095db69838be11e5"
        />
      </div>
      <div className="container mx-auto px-4 py-6 grid items-center">
        <p className="text-sm text-gray-600 text-center">
          © {new Date().getFullYear()} Best Movies Hub. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
