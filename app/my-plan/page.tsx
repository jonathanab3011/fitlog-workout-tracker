"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default function MyPlanPage() {
  const [activeTab, setActiveTab] = useState<"todays" | "saved">("saved");

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Page Title & Subtitle */}
      <div className="space-y-1.5">
        <h1 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
          MY PLAN
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm font-medium">
          Cap of five lifts for today. Finish there, then load more.
        </p>
      </div>

      {/* Summary Stats Box */}
      <div className="bg-[#151821] border border-slate-800/80 rounded-2xl p-6 grid grid-cols-3 gap-4">
        <div>
          <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Exercises
          </p>
          <p className="text-3xl font-black text-[#ccff00]">2</p>
        </div>
        <div>
          <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Minutes
          </p>
          <p className="text-3xl font-black text-white">23</p>
        </div>
        <div>
          <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Calories
          </p>
          <p className="text-3xl font-black text-white">190</p>
        </div>
      </div>

      {/* Filter Tabs & Sort Dropdown */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Toggle Tabs */}
        <div className="bg-[#151821] p-1 rounded-xl border border-slate-800/80 flex items-center gap-1">
          <button
            onClick={() => setActiveTab("todays")}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === "todays"
                ? "bg-[#212634] text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Today's Plan
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === "saved"
                ? "bg-[#212634] text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Saved
          </button>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>Sort by</span>
          <button className="bg-[#151821] border border-slate-800/80 text-slate-200 font-semibold px-3 py-1.5 rounded-lg flex items-center gap-2 hover:border-slate-700">
            Duration
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>
      </div>

      {/* Empty State Box */}
      <div className="bg-[#151821]/40 border border-dashed border-slate-800/80 rounded-3xl p-16 text-center flex flex-col items-center justify-center space-y-4 min-h-[320px]">
        <h2 className="text-lg sm:text-xl font-black text-white uppercase tracking-wider">
          NOTHING HERE YET
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm font-medium max-w-sm">
          Browse the library and add a lift to get today moving.
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-block bg-[#ccff00] hover:bg-[#b8e600] text-black font-extrabold text-xs uppercase px-6 py-3 rounded-full transition-all shadow-md shadow-[#ccff00]/10"
          >
            Go to workouts
          </Link>
        </div>
      </div>
    </div>
  );
}