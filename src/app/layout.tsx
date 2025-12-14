import type { Metadata } from "next";
import { Playfair_Display, PT_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const ptSans = PT_Sans({
  variable: "--font-pt-sans",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "RiadConnect | The Digital Partner for Modern Riads",
    template: "%s | RiadConnect"
  },
  description: "Sophisticated digital platform for Moroccan Riad owners to increase bookings, streamline operations, and master their digital presence commission-free.",
  keywords: ["Riad", "Morocco", "Hospitality", "Hotel Management", "Direct Bookings", "Marrakech", "Digital Marketing"],
  authors: [{ name: "RiadConnect Team" }],
  creator: "RiadConnect",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://riadconnect.ma",
    title: "RiadConnect | The Digital Partner for Modern Riads",
    description: "Sophisticated digital platform for Moroccan Riad owners to increase bookings and streamline operations.",
    siteName: "RiadConnect",
    images: [
      {
        url: "/og-image.jpg", // We need to ensure this exists or use a placeholder
        width: 1200,
        height: 630,
        alt: "RiadConnect - Digital Oasis for Riads",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RiadConnect | The Digital Partner for Modern Riads",
    description: "Sophisticated digital platform for Moroccan Riad owners to increase bookings and streamline operations.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  metadataBase: new URL("https://riadconnect.ma"),
};

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

// ... imports

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${ptSans.variable} antialiased font-sans bg-background text-foreground flex flex-col min-h-screen`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-grow pt-20">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
