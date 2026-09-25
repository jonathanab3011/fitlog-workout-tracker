export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
      <div className="w-12 h-12 border-4 border-slate-800 border-t-[#ccff00] rounded-full animate-spin" />
      <p className="text-slate-400 text-xs font-bold uppercase tracking-widest animate-pulse">
        Loading Workouts...
      </p>
    </div>
  );
}