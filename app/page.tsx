import Link from "next/link";
import { fetchAllWorkouts } from "@/lib/api";
import WorkoutCard from "@/components/WorkoutCard";
import { Workout } from "@/types/workout";

export default async function HomePage() {
  let workouts: Workout[] = [];
  try {
    workouts = await fetchAllWorkouts();
  } catch (error) {
    console.error("Failed to fetch workouts:", error);
  }

  return (
    <div className="space-y-8 sm:space-y-12 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="bg-[#151821] border border-slate-800/80 rounded-3xl p-6 sm:p-10 lg:p-12 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-left">
            <span className="text-[#ccff00] font-black text-xs sm:text-sm tracking-widest uppercase">
              WORKOUT LIBRARY
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase leading-[1.05]">
              TRAIN WITH INTENT. <br className="hidden sm:inline" /> LOG EVERY SET.
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm lg:text-base max-w-lg mx-auto lg:mx-0 leading-relaxed">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.
            </p>

            {/* Mobile Image: এটি শুধুমাত্র মোবাইল স্ক্রিনে প্যারাগ্রাফের নিচে এবং বাটনের উপরে দেখাবে */}
            <div className="flex lg:hidden justify-center w-full my-4">
              <div className="relative w-full max-w-[260px] sm:max-w-[320px] aspect-square flex items-center justify-center">
                <img
                  src="/banner.png"
                  alt="Workout Illustration"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            <div className="pt-2">
              <a
                href="#library"
                className="inline-block bg-[#ccff00] hover:bg-[#b8e600] text-black font-black uppercase text-xs tracking-wider px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-[#ccff00]/10 cursor-pointer active:scale-95"
              >
                BROWSE WORKOUTS
              </a>
            </div>
          </div>

          {/* Desktop Right Hero Image: এটি শুধুমাত্র বড় স্ক্রিনে (lg) ডানপাশে দেখাবে */}
          <div className="hidden lg:flex lg:col-span-5 justify-end">
            <div className="relative w-full max-w-[260px] sm:max-w-[320px] aspect-square flex items-center justify-center">
              <img
                src="/banner.png"
                alt="Workout Illustration"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

        </div>
      </section>

      {/* Library Section */}
      <section id="library" className="space-y-6 scroll-mt-24">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-wider uppercase">
            THE LIBRARY
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {/* Responsive Grid: 1-col on Mobile, 2-col on Tablet, 3-col on Desktop */}
        {workouts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {workouts.map((workout: Workout, index: number) => (
              <WorkoutCard key={workout.id || workout._id || index} workout={workout} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#151821] rounded-2xl border border-slate-800">
            <p className="text-slate-400 text-sm">No workouts found in library.</p>
          </div>
        )}
      </section>
    </div>
  );
}