import type { Metadata, Viewport } from "next";
import { PWARegister } from "@/components/PWARegister";
import "./globals.css";

export const metadata: Metadata = {
  title: "CityPets",
  description: "Red social para personas que aman a sus mascotas en Ushuaia.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "CityPets",
    statusBarStyle: "default"
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.svg", sizes: "192x192", type: "image/svg+xml" },
      { url: "/icons/icon-512.svg", sizes: "512x512", type: "image/svg+xml" }
    ],
    apple: [{ url: "/icons/icon-192.svg", sizes: "192x192", type: "image/svg+xml" }]
  }
};

export const viewport: Viewport = {
  themeColor: "#22C55E",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>
        {children}
        <PWARegister />
      </body>
    </html>
  );
}
