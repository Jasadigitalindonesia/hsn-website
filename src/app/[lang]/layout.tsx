import type { Metadata } from "next";
import { Poppins, Roboto } from "next/font/google";
import "../globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  subsets: ["latin"],
});

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PT Harvest Selaras Nusantara | Premium Medical & Aesthetic Equipments",
  description: "Trusted official distributor of medical, aesthetic, surgical, dental, laboratory equipments, and hospital furniture in Indonesia. Certified, reliable, and premium technical support.",
  keywords: "PT Harvest Selaras Nusantara, HSN, Medical Equipment, Aesthetic Devices, Dental Equipment, Laboratory Equipment, Hospital Furniture, Indonesia",
  authors: [{ name: "PT Harvest Selaras Nusantara" }],
  openGraph: {
    title: "PT Harvest Selaras Nusantara | Premium Medical & Aesthetic Equipments",
    description: "Trusted official distributor of medical, aesthetic, surgical, dental, laboratory equipments, and hospital furniture in Indonesia.",
    type: "website",
  }
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  return (
    <html
      lang={lang}
      className={`${poppins.variable} ${roboto.variable} scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col bg-white text-[#54595F] font-poppins antialiased">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
