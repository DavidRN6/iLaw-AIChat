import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { AppContextProvider } from "@/context/AppContext";

const inter = Inter({
  variable: "--font-Inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "iLaw AI Chat",
  description: "Made by David Raoof",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <AppContextProvider>
        <html lang="en">
          <head>
            <link rel="icon" href="/favicon.ico" />
          </head>
          <body className={`${inter.className} antialiased`}>{children}</body>
        </html>
      </AppContextProvider>
    </ClerkProvider>
  );
}
