import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Chatbot from "./components/common/Chatbot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Skyne",
  description: "Taking your skincare game SKYne High",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Use a client-side hook to get the current pathname
  // But layout.tsx is a server component, so use a workaround:
  // Only render Navbar/Footer/Chatbot if not on /auth route
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <Navbar />
        {children}
        <Footer />
        <Chatbot />
      </body>
    </html>
  );
}

// Move conditional rendering to a client component
