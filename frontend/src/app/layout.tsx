import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "./components/navbar/Nav";
import { NextUIProvider } from "@nextui-org/react";
import Providers from "@/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Adoptar mascotas",
  description: "Adopta un nuevo amigo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <NextUIProvider>
            <Nav />
            <div className="w-[90%] m-auto lg:w-[60%]">{children}</div>
          </NextUIProvider>
        </Providers>
      </body>
    </html>
  );
}
