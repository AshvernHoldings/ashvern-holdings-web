import type { Metadata } from "next";
import { EB_Garamond, Lato } from "next/font/google";
import "./globals.css";

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-eb-garamond",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
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
    <html lang="en" className={`${ebGaramond.variable} ${lato.variable}`}>
      <body>{children}</body>
    </html>
  );
}
