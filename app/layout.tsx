import type { Metadata } from "next";
import { Fraunces, Public_Sans } from "next/font/google";
import { MotionProvider } from "./motion-provider";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-public-sans",
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
    <html lang="en" className={`${fraunces.variable} ${publicSans.variable}`}>
      <body>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
