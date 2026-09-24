'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const planCount = 0;
  const savedCount = 0;

  return (
    <header className="bg-[#0a0b0d] border-b border-slate-900 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Left: Logo */}
         <Link href="/" className="flex items-center gap-2.5">
                <img src="/logo.png" alt="FITLOG Logo" className="w-6 h-6 object-contain" />
                <span className="text-white font-black text-xl tracking-wider uppercase">
                    FITLOG
                </span>
         </Link>

        {/* Center: Navigation Links */}
        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
              pathname === "/workouts" || pathname === "/"
                ? "bg-[#172509] text-[#ccff00]"
                : "text-slate-300 hover:text-white"
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/plan"
            className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
              pathname === "/plan"
                ? "bg-[#172509] text-[#ccff00]"
                : "text-slate-300 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </nav>

        {/* Right: Plan & Saved Counters */}
        <div className="flex items-center gap-6">
          {/* Plan Counter */}
          <Link href="/plan" className="flex items-center gap-2 group">
            <span className="text-xs font-semibold text-slate-300 group-hover:text-white">
              Plan
            </span>
            <span className="bg-[#ccff00] text-black text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center">
              {planCount}
            </span>
          </Link>

          {/* Saved Counter */}
          <Link href="/saved" className="flex items-center gap-2 group">
            <span className="text-xs font-semibold text-slate-300 group-hover:text-white">
              Saved
            </span>
            <span className="border border-slate-700 text-slate-400 text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {savedCount}
            </span>
          </Link>
        </div>

      </div>
    </header>
  );
}