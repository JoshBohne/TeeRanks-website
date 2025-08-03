import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "TeeRank - Rate the World's Greatest Golf Holes",
  description: "Discover and rate famous golf holes and courses worldwide. The Letterboxd for golf is coming soon - join the waitlist!",
  keywords: ["golf", "golf courses", "golf holes", "ratings", "reviews", "bucket list", "golf app"],
  openGraph: {
    title: "TeeRank - Rate the World's Greatest Golf Holes",
    description: "Discover and rate famous golf holes and courses worldwide. The Letterboxd for golf is coming soon!",
    url: "https://teeranks.com",
    siteName: "TeeRank",
    images: [
      {
        url: "/teerank-logo.png",
        width: 1200,
        height: 630,
        alt: "TeeRank Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TeeRank - Rate the World's Greatest Golf Holes",
    description: "The Letterboxd for golf is coming soon - join the waitlist!",
    images: ["/teerank-logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
