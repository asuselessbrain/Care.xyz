import { Geist, Geist_Mono } from "next/font/google";
import React, { Suspense } from "react";
import { poppins, fontBangla } from "@/lib/fonts";
import "./globals.css";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import NextAuthProvider from "@/provider/NextAuthProvider";

// Fonts are now provided via shared module to allow client imports.

export const metadata = {
  metadataBase: new URL("https://care.xyz"),

  title: {
    default: "Care.xyz | Baby Sitting & Elderly Care",
    template: "%s | Care.xyz",
  },

  description:
    "Care.xyz helps you book reliable and trusted caregivers for babysitting, elderly care, and special care at home.",

  applicationName: "Care.xyz",

  keywords: [
    "babysitting",
    "elderly care",
    "home care",
    "caregiver",
    "trusted care",
    "book care services",
  ],

  authors: [{ name: "Care.xyz Team" }],
  creator: "Care.xyz",
  publisher: "Care.xyz",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: "/assets/logo.png",
    apple: "/assets/logo.png",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://care.xyz",
    siteName: "Care.xyz",
    title: "Care.xyz | Baby Sitting & Elderly Care",
    description:
      "Book trusted babysitting, elderly and special care services at home.",
    images: [
      {
        url: "/assets/hero.png",
        width: 1200,
        height: 630,
        alt: "Care.xyz Homepage Preview",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Care.xyz | Baby Sitting & Elderly Care",
    description:
      "Book reliable care services for family members at home.",
    images: ["/assets/hero.png"],
  },

  category: "care",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <NextAuthProvider>
          <header className="py-2 md:w-11/12 mx-auto">
            <Navbar></Navbar>
          </header>
          <main className="py-2 md:w-11/12 mx-auto min-h-[calc(100vh-302px)]" suppressHydrationWarning>
            <Suspense fallback={<div className="py-6">Loading...</div>}>
              {children}
            </Suspense>
          </main>

          <footer>
            <Footer></Footer>
          </footer>
        </NextAuthProvider>
      </body>
    </html>
  );
}
