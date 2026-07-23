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
  title: "PT Harvest Selaras Nusantara Medica | Premium Medical & Aesthetic Equipments",
  description: "Trusted official distributor of medical, aesthetic, surgical, dental, laboratory equipments, and hospital furniture in Indonesia. Certified, reliable, and premium technical support.",
  keywords: "PT Harvest Selaras Nusantara Medica, HSN, Medical Equipment, Aesthetic Devices, Dental Equipment, Laboratory Equipment, Hospital Furniture, Indonesia",
  authors: [{ name: "PT Harvest Selaras Nusantara Medica" }],
  openGraph: {
    title: "PT Harvest Selaras Nusantara Medica | Premium Medical & Aesthetic Equipments",
    description: "Trusted official distributor of medical, aesthetic, surgical, dental, laboratory equipments, and hospital furniture in Indonesia.",
    type: "website",
  },
  verification: {
    google: "pwFcXxGM2Dk-gxFB5CRXBW1hwUaugpLM-jhRdgCYx30",
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
    const lang = (await Promise.resolve(params))?.lang || 'id';
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
