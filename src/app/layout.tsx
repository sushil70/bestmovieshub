import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Suspense } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Full HD Movies | Download | Best Movies Hub",
  description: "Best Movies Hub, A free download movies website",
  // icons: {
  //   icon: "/metaLogo.png",
  // },
  keywords: [
    "Best Movies Hub",
    "Download",
    "Movies",
    "Hd Movies",
    "Free Download",
    "Best Download",
    "Hd Movies Download",
    "Hd Movies Free Download",
    "Hd Movies Download Site",
    "Hd Movies Free Download Site",
  ],

  openGraph: {
    title: "Best Movies Hub",
    description: "Best Movies Hub, A free download movies website",
    url: "https://bestmovieshub.fun",
    siteName: "Best Movies Hub",
    tags: [
      "Best Movies Hub",
      "Download",
      "Movies",
      "Hd Movies",
      "Free Download",
      "Best Download",
      "Hd Movies Download",
      "Hd Movies Free Download",
      "Hd Movies Download Site",
      "Hd Movies Free Download Site",
    ],

    images: [
      {
        url: "/icon.png",
        width: 87,
        height: 87,
        alt: "My custom alt",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.png" />
        <meta
          name="google-site-verification"
          content="NN4vn7GIyVLHdcBVRveT5wQkd7U-DbuwamGe94Os0xA"
        />
        <script
          type="text/javascript"
          src="//pl24559249.cpmrevenuegate.com/5a/0f/37/5a0f371c3d1a1a74cd3980b00c921fd7.js"
          async
        ></script>
        {/* <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1763907200549927"
          crossOrigin="anonymous"
        ></script> */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex flex-col min-h-screen">
          <Suspense fallback={<div>Loading...</div>}>
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </Suspense>
        </div>
      </body>
    </html>
  );
}
