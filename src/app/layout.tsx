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
  title: "Best Movies Hub",
  description: "Best Movies Hub, A free download movies website",
  // icons: {
  //   icon: "/metaLogo.png",
  // },

  // openGraph: {
  //   images: [
  //     {
  //       url: "/images/metalogo.png",
  //       width: 20,
  //       height: 20,
  //       alt: "My custom alt",
  //     },
  //   ],
  // },
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
          src="//pl24551229.cpmrevenuegate.com/11/69/5e/11695ee6f6b6a6f2271e7f2629307b20.js"
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
