import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "./components/navbar/Nav";
import Providers from "@/Providers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
          <Nav />
          <div className="w-[90%] m-auto lg:w-[60%]">{children}</div>
          <ToastContainer />
        </Providers>
      </body>
    </html>
  );
}
