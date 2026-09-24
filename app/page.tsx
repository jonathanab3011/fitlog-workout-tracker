import Link from "next/link";
import { fetchAllWorkouts } from "@/lib/api";
import WorkoutCard, { Workout } from "@/components/WorkoutCard";

export default async function HomePage() {
  let workouts: Workout[] = [];
  try {
    workouts = await fetchAllWorkouts();
  } catch (error) {
    console.error("Failed to fetch workouts:", error);
  }

  return (
    <div className="space-y-10 pb-16">
      {/* Hero Section */}
      <section className="bg-[#151821] border border-slate-800/80 rounded-3xl p-8 sm:p-12 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase leading-[1.05]">
              TRAIN WITH INTENT. LOG <br />
              EVERY SET.
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-lg leading-relaxed">
              A thoughtfully curated, science-backed workout library to track every rep, set, and session with precision.
            </p>
            <div className="pt-2">
              <Link
                href="/workouts"
                className="inline-block bg-[#ccff00] hover:bg-[#b8e600] text-black font-black uppercase text-xs tracking-wider px-6 py-3.5 rounded-lg transition-all shadow-lg shadow-[#ccff00]/10"
              >
                BROWSE WORKOUTS
              </Link>
            </div>
          </div>

          {/* Right Hero Image / Illustration */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[320px] aspect-square flex items-center justify-center">
            <img
              src="/banner.png"
              alt="Workout Illustration"
              className="w-full h-full"
            />
            </div>
          </div>

        </div>
      </section>

      {/* Library Section */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-black text-white tracking-wider uppercase">
            THE LIBRARY
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            Explore the full training catalogue below.
          </p>
        </div>

        {/* 3-Column Grid Matching Design */}
        {workouts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {workouts.map((workout: Workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
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