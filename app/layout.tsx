import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["700", "900"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ashvern Holdings, Inc.",
  description:
    "Ashvern Holdings, Inc. is a privately held Georgia corporation that owns and oversees equity interests in a group of operating subsidiaries.",
  openGraph: {
    title: "Ashvern Holdings, Inc.",
    description:
      "A privately held Georgia corporation that owns and oversees equity interests in a group of operating subsidiaries.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${archivo.variable}`}>
      <body>{children}</body>
    </html>
  );
}
