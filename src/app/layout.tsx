import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Roboto } from "next/font/google";
import "../styles/globals.css";

//Project Imports
import ProviderWrapper from "@/store/ProviderWrapper";

const inter = Inter({ subsets: ["latin"] });

const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sky Scout",
  description: "Search the best flights for you",
  icons: {
    icon: "/skyscoutlogo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ProviderWrapper>
        <body className={roboto.className}>{children}</body>
      </ProviderWrapper>
    </html>
  );
}
