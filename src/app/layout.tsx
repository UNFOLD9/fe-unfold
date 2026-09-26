import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UNFOLD — Self-Reflection & Wellbeing Companion",
  description:
    "Kamu tidak harus menyelesaikan semuanya hari ini. Ruang tenang untuk mencatat perasaan, memproses pikiran tanpa penghakiman, dan merayakan kemajuan kecilmu.",
  icons: {
    icon: "/unfold-logo.png",
    apple: "/unfold-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${plusJakartaSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
