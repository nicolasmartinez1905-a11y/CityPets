import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CityPets",
  description: "Conectando mascotas y personas en tu ciudad."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
