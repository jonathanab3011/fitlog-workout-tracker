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
    <html lang="en">
      <body className={`${inter.className} bg-slate-950 text-slate-100 min-h-screen antialiased`}>
        <PlanProvider>
          <Navbar />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          
          {/* Custom Global Stacked Toast Container */}
          <GlobalToast />

          {/* React Hot Toast Component */}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#0f172a",
                color: "#fff",
                border: "1px solid #334155",
              },
            }}
          />
          
          <Footer />
        </PlanProvider>
      </body>
    </html>
  );
}