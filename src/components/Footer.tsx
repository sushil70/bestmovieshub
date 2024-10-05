"use client";

export default function Footer() {
  return (
    <footer className="bg-white shadow-sm mt-auto">
      <div className="container mx-auto px-4 py-6 grid items-center">
        <p className="text-sm text-gray-600 text-center">
          © {new Date().getFullYear()} Best Movies Hub. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
