import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Suspense } from "react";
import Script from "next/script";

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
  title: "Full HD Movies Download | Best Movies Hub ",
  description:
    "Best Movies Hub | Download a wide collection of movies and series for free. Explore the latest releases, classics, and genres, all available for fast, easy downloading. Join now and enjoy free movie downloads!",
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
    "movie download",
    "movies download",
    "movie download site",
    "movies download site",
    "free movie download",
    "free movies download",
    "free movie download site",
    "free movies download site",
    "best movies download",
    "best movies download site",
    "best movie download",
    "best movie download site",
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
          content="eWc-4KqTpRdjZv1i12XPSqDM3YDBe9c82vSwEYXL8nE"
        />
        {/* <!-- Google Tag Manager --> */}
        <Script
          id="gtm-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-NLCD8CFD');
            `,
          }}
        />
        {/* <!-- End Google Tag Manager --> */}
        {/* popover ads */}
        <script
          type="text/javascript"
          src="//pl24666840.cpmrevenuegate.com/83/2d/ff/832dffd4b04a3a639fbe4b2c7e762963.js"
          async
        ></script>
        {/* social ads */}
        <script
          type="text/javascript"
          src="//pl24666986.cpmrevenuegate.com/37/c3/5b/37c35b3285ba4c29ad66bf99b68c9fc4.js"
          async
        ></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <!-- Google Tag Manager (noscript) --> */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NLCD8CFD"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* <!-- End Google Tag Manager (noscript) --> */}
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
