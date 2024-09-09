import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
import { relative } from "path";
import { Footer, Navbar } from "@/components";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rental Mobil",
  description: "Menrental mobil lebih baik",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="relative">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
