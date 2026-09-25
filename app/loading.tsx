export default function Loading() {
  return (
    <div className="min-h-[50vh] sm:min-h-[60vh] flex flex-col items-center justify-center space-y-3 sm:space-y-4 px-4">
      <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-slate-800 border-t-[#ccff00] rounded-full animate-spin shrink-0" />
      <p className="text-slate-400 text-[11px] sm:text-xs font-bold uppercase tracking-widest animate-pulse text-center">
        Loading Workouts...
      </p>
    </div>
  );
}