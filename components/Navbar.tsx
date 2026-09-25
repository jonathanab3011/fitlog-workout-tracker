'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const [planCount, setPlanCount] = useState<number>(0);
  const [savedCount, setSavedCount] = useState<number>(0);

  const updateCounts = () => {
    try {
      const plan = JSON.parse(localStorage.getItem("fitlog_plan") || "[]");
      const saved = JSON.parse(localStorage.getItem("fitlog_saved") || "[]");
      setPlanCount(plan.length);
      setSavedCount(saved.length);
    } catch (e) {
      console.error("Error reading counts from localStorage:", e);
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

  const isWorkoutsActive = pathname === "/" || pathname.startsWith("/workouts");
  const isPlanActive = pathname === "/my-plan";

  return (
    <header className="bg-[#0a0b0d] border-b border-slate-900 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        <Link href="/" className="flex items-center gap-2.5">
          <img src="/logo.png" alt="FITLOG Logo" className="w-6 h-6 object-contain" />
          <span className="text-white font-black text-xl tracking-wider uppercase">
            FITLOG
          </span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
              isWorkoutsActive
                ? "bg-[#172509] text-[#ccff00]"
                : "text-slate-300 hover:text-white"
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
              isPlanActive
                ? "bg-[#172509] text-[#ccff00]"
                : "text-slate-300 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </nav>

        <div className="flex items-center gap-6">
          <Link href="/my-plan" className="flex items-center gap-2 group">
            <span className="text-xs font-semibold text-slate-300 group-hover:text-white transition-colors">
              Plan
            </span>
            <span className="bg-[#ccff00] text-black text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center">
              {planCount}
            </span>
          </Link>

          <Link href="/my-plan" className="flex items-center gap-2 group">
            <span className="text-xs font-semibold text-slate-300 group-hover:text-white transition-colors">
              Saved
            </span>
            <span className="border border-slate-700 text-slate-400 group-hover:text-slate-200 text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center transition-colors">
              {savedCount}
            </span>
          </Link>
        </div>

      </div>
    </header>
  );
}