import "./globals.css";
import type { Metadata } from "next";
import { Open_Sans, PT_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});
const ptSans = PT_Sans({
  subsets: ["latin"],
  variable: "--font-pt-sans",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Eric (cirex)",
  description: "The personal online home of Eric",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={openSans.variable + " " + ptSans.variable}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
