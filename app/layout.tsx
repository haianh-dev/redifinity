import type { Metadata } from "next";
import { Fraunces, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["vietnamese", "latin"],
  variable: "--font-display",
  weight: ["400", "500", "600"],
});

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["vietnamese", "latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Redifinity — Việt Phục Remix",
  description: "Khám phá và phối Việt phục theo phong cách của bạn.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className={`${fraunces.variable} ${beVietnamPro.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}