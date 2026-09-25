import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PlanProvider } from "../context/PlanContext";
import { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";
import GlobalToast from "@/components/GlobalToast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FitLog - Workout & Lift Tracker",
  description: "Track your daily lifts and workout routines with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-[#0a0b0d] text-slate-100 min-h-screen flex flex-col antialiased selection:bg-[#ccff00] selection:text-black`}>
        <PlanProvider>
          {/* Header Navbar */}
          <Navbar />

          {/* Main Content Area */}
          <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
            {children}
          </main>
          
          {/* Custom Global Stacked Toast Container */}
          <GlobalToast />

          {/* React Hot Toast Component */}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#151821",
                color: "#fff",
                border: "1px solid #1e293b",
                fontSize: "12px",
                borderRadius: "12px",
              },
            }}
          />
          
          {/* Sticky/Bottom Footer */}
          <Footer />
        </PlanProvider>
      </body>
    </html>
  );
}