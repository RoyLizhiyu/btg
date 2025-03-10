import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/lib/store/storeProvider";
import { NextUIProvider } from "@nextui-org/system";

const inter = Inter({ subsets: ["latin"] });
 
export const metadata: Metadata = {
  title: "BTG - Backing Track Generator",
  description: "BTG - Backing Track Generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextUIProvider>
          <StoreProvider>{children}</StoreProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}
