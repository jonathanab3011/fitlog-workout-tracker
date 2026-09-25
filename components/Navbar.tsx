'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [planCount, setPlanCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);

  const updateCounts = () => {
    try {
      const plan = JSON.parse(localStorage.getItem("fitlog_plan") || "[]");
      const saved = JSON.parse(localStorage.getItem("fitlog_saved") || "[]");
      setPlanCount(plan.length);
      setSavedCount(saved.length);
    } catch {
      setPlanCount(0);
      setSavedCount(0);
    }
  };

  useEffect(() => {
    updateCounts();
    window.addEventListener("planUpdated", updateCounts);
    window.addEventListener("storage", updateCounts);

    return () => {
      window.removeEventListener("planUpdated", updateCounts);
      window.removeEventListener("storage", updateCounts);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-[#0f1115] border-b border-slate-900/80">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-1 sm:gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1 sm:gap-2 shrink-0">
          <img src="/logo.png" alt="logo" className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-xs sm:text-base font-black text-white tracking-wider uppercase font-sans">
            FITLOG
          </span>
        </Link>

        {/* Links */}
        <nav className="flex items-center gap-0.5 sm:gap-2 shrink-0">
          <Link
            href="/"
            className={`px-2 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-bold transition-all ${
              pathname === "/"
                ? "bg-[#1b2b0a] text-[#ccff00]"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan?tab=todays"
            className={`px-2 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-bold transition-all whitespace-nowrap ${
              pathname === "/my-plan"
                ? "bg-[#1b2b0a] text-[#ccff00]"
                : "text-slate-400 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </nav>

        {/* Badges */}
        <div className="flex items-center gap-2 sm:gap-5 text-[10px] sm:text-xs font-bold shrink-0">
          <Link
            href="/my-plan?tab=todays"
            className="flex items-center gap-1 sm:gap-2 text-slate-300 hover:text-white transition-colors"
          >
            <span className="hidden xs:inline sm:inline">Plan</span>
            <span className="bg-[#ccff00] text-black font-black w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center text-[9px] sm:text-[10px]">
              {planCount}
            </span>
          </Link>

          <Link
            href="/my-plan?tab=saved"
            className="flex items-center gap-1 sm:gap-2 text-slate-300 hover:text-white transition-colors"
          >
            <span className="hidden xs:inline sm:inline">Saved</span>
            <span className="border border-slate-700 bg-slate-900/80 text-slate-300 font-extrabold w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center text-[9px] sm:text-[10px]">
              {savedCount}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}