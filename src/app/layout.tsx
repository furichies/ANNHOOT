import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AnnaHoot - Quiz de Fisiología",
  description: "Aprende fisiología jugando. Un quiz interactivo estilo Kahoot con 20 preguntas sobre sistemas del cuerpo humano.",
  keywords: ["AnnaHoot", "Quiz", "Fisiología", "Educación", "Kahoot", "Aprendizaje", "Medicina"],
  authors: [{ name: "AnnaHoot Team" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "AnnaHoot - Quiz de Fisiología",
    description: "Aprende fisiología jugando con este quiz interactivo",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
