import { fetchAllWorkouts } from "@/lib/api";
import { Workout } from "@/types/workout";
import { Calendar, Bookmark } from "lucide-react";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function WorkoutDetailPage({ params }: PageProps) {
  const { id } = await params;

  let workouts: Workout[] = [];

  try {
    workouts = await fetchAllWorkouts();
  } catch (error) {
    console.error("Failed to fetch workouts:", error);
  }

  const workout = workouts.find(
    (w) => String(w.id || w._id) === String(id)
  );

  if (!workout) {
    notFound();
  }

  const w = workout as any;

  console.log("Current Workout Object:", w);

  const workoutImage =
    w.image || w.imageUrl || w.img || w.thumbnail || "/banner.png";

  const title = w.name || w.title || w.workoutName || w.exerciseName || "Workout Detail";

  const description =
    w.description ||
    w.desc ||
    w.details ||
    w.about ||
    "No description available for this workout.";

  const rawMuscleGroups = w.muscleGroups || w.muscles || w.targetMuscles || w.category;
  const muscleGroups: string[] = Array.isArray(rawMuscleGroups)
    ? rawMuscleGroups
    : rawMuscleGroups
    ? [String(rawMuscleGroups)]
    : [];

  const rawInstructions = w.instructions || w.steps || w.guide || w.procedure;
  const instructions: string[] = Array.isArray(rawInstructions)
    ? rawInstructions
    : rawInstructions
    ? [String(rawInstructions)]
    : ["No instructions provided."];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 py-4">
      {/* Left Column: Image */}
      <div className="lg:col-span-6">
        <div className="relative aspect-square w-full bg-[#151821] border border-slate-800/80 rounded-3xl overflow-hidden shadow-2xl">
          <img
            key={String(w.id || w._id)}
            src={workoutImage}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Right Column: Details */}
      <div className="lg:col-span-6 space-y-6">
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
            {title}
          </h1>
          <p className="text-slate-400 text-sm font-medium leading-relaxed">
            {description}
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            {muscleGroups.length > 0 ? (
              muscleGroups.map((group, idx) => (
                <span
                  key={idx}
                  className="bg-[#ccff00] text-black font-extrabold text-xs tracking-wider uppercase px-2.5 py-1 rounded"
                >
                  {group}
                </span>
              ))
            ) : (
              <span className="bg-[#ccff00] text-black font-extrabold text-xs tracking-wider uppercase px-2.5 py-1 rounded">
                General
              </span>
            )}
          </div>
        </div>

        {/* Spec Box */}
        <div className="bg-[#151821] border border-slate-800/80 rounded-2xl p-5 space-y-3.5 text-xs">
          <div className="flex justify-between items-center text-slate-400">
            <span className="uppercase font-semibold tracking-wider text-slate-500">
              EQUIPMENT
            </span>
            <span className="font-bold text-slate-200">
              {w.equipment || w.equipments || w.gear || "Bodyweight / None"}
            </span>
          </div>
          <div className="border-t border-slate-800/60 pt-3 flex justify-between items-center text-slate-400">
            <span className="uppercase font-semibold tracking-wider text-slate-500">
              SETS
            </span>
            <span className="font-bold text-slate-200">{w.sets || w.set || "3"}</span>
          </div>
          <div className="border-t border-slate-800/60 pt-3 flex justify-between items-center text-slate-400">
            <span className="uppercase font-semibold tracking-wider text-slate-500">
              REPS
            </span>
            <span className="font-bold text-slate-200">{w.reps || w.rep || "10-12"}</span>
          </div>
          <div className="border-t border-slate-800/60 pt-3 flex justify-between items-center text-slate-400">
            <span className="uppercase font-semibold tracking-wider text-slate-500">
              DURATION
            </span>
            <span className="font-bold text-slate-200">
              {w.duration || w.time || 15} min
            </span>
          </div>
        </div>

        {/* Instructions */}
        <div className="space-y-3 pt-2">
          <h3 className="text-white font-black text-sm tracking-wider uppercase">
            INSTRUCTIONS
          </h3>
          <ol className="space-y-2 text-xs text-slate-400 leading-relaxed list-decimal list-inside">
            {instructions.map((step, idx) => (
              <li key={idx} className="pl-1">
                {step}
              </li>
            ))}
          </ol>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 pt-4">
          <button className="bg-[#ccff00] hover:bg-[#b8e600] text-black font-extrabold text-xs uppercase px-5 py-3 rounded-xl flex items-center gap-2 transition-all">
            <Calendar className="w-4 h-4" />
            Add to today's plan
          </button>
          <button className="bg-[#151821] hover:bg-slate-800 border border-slate-800 text-slate-300 font-bold text-xs uppercase px-5 py-3 rounded-xl flex items-center gap-2 transition-colors">
            <Bookmark className="w-4 h-4" />
            Save for later
          </button>
        </div>
      </div>
    </div>
  );
}