import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HSN Admin Panel",
  description: "CMS for PT Harvest Selaras Nusantara Medica",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${poppins.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col bg-gray-50 text-gray-800 font-poppins antialiased">
        {children}
      </body>
    </html>
  );
}
