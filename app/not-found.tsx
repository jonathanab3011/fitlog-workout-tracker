import Link from "next/link";
import { Dumbbell } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 space-y-6">
      <div className="p-4 bg-[#151821] border border-slate-800 rounded-3xl text-[#ccff00] animate-bounce">
        <Dumbbell className="w-16 h-16" />
      </div>
      <div className="space-y-2">
        <h1 className="text-6xl font-black text-white tracking-wider">404</h1>
        <h2 className="text-xl font-bold text-slate-300 uppercase">Page Not Found</h2>
        <p className="text-slate-400 text-sm max-w-md">
          The lift or page you are looking for doesn't exist or has been moved.
        </p>
      </div>
      <Link
        href="/"
        className="bg-[#ccff00] hover:bg-[#b8e600] text-black font-extrabold text-xs uppercase px-6 py-3.5 rounded-full transition-all shadow-lg shadow-[#ccff00]/10"
      >
        Back to Library
      </Link>
    </div>
  );
}