import Link from "next/link";
import { Dumbbell } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[65vh] sm:min-h-[70vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 py-12 space-y-4 sm:space-y-6">
      {/* Animated Icon */}
      <div className="p-3.5 sm:p-4 bg-[#151821] border border-slate-800 rounded-2xl sm:rounded-3xl text-[#ccff00] animate-bounce">
        <Dumbbell className="w-10 h-10 sm:w-16 sm:h-16" />
      </div>

      {/* Text Section */}
      <div className="space-y-1.5 sm:space-y-2">
        <h1 className="text-5xl sm:text-7xl font-black text-white tracking-wider">404</h1>
        <h2 className="text-lg sm:text-xl font-bold text-slate-300 uppercase">Page Not Found</h2>
        <p className="text-slate-400 text-xs sm:text-sm max-w-xs sm:max-w-md mx-auto leading-relaxed">
          The lift or page you are looking for doesn't exist or has been moved.
        </p>
      </div>

      {/* Button */}
      <div className="pt-2">
        <Link
          href="/"
          className="inline-block bg-[#ccff00] hover:bg-[#b8e600] text-black font-extrabold text-xs uppercase px-6 py-3 sm:py-3.5 rounded-full transition-all shadow-lg shadow-[#ccff00]/10 active:scale-95"
        >
          Back to Library
        </Link>
      </div>
    </div>
  );
}