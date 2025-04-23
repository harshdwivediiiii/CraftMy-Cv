import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import Navbar from "@/components/Navbar";
import { ClientThemeProvider } from "@/components/ClientThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Craftmycv",
  description: "An AI SaAS for CV",
  icons: {
    icon: [
      { url: "/light-logo.png", media: "(prefers-color-scheme: light)" },
      { url: "/dark-logo.png", media: "(prefers-color-scheme: dark)" },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ClerkProvider>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <ClientThemeProvider>
            <Navbar />
            {children}
          </ClientThemeProvider>
        </body>
      </ClerkProvider>
    </html>
  );
}
