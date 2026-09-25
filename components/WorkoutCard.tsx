'use client';

import Link from "next/link";
import { Workout } from "@/types/workout";
import { Clock, Flame, Star } from "lucide-react";

interface WorkoutCardProps {
  workout: Workout;
}

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  const workoutId = workout.id || workout._id;

  return (
    <Link href={`/workouts/${workoutId}`} className="block group h-full">
      <div className="bg-[#151821] border border-slate-800/80 rounded-2xl overflow-hidden hover:border-slate-700 transition-all flex flex-col justify-between h-full">
        <div>
          {/* Card Image */}
          <div className="relative aspect-[16/9] w-full bg-slate-800 overflow-hidden">
            <img
              src={workout.image || workout.imageUrl || "/placeholder.png"}
              alt={workout.name || workout.title || "Workout"}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Content Body */}
          <div className="p-4 sm:p-5 space-y-2.5 sm:space-y-3">
            {/* Neon Green Muscle Badges */}
            <div className="flex flex-wrap gap-1 sm:gap-1.5">
              {workout.muscleGroups && workout.muscleGroups.length > 0 ? (
                workout.muscleGroups.map((group, idx) => (
                  <span
                    key={idx}
                    className="bg-[#ccff00] text-black font-extrabold text-[9px] sm:text-[10px] tracking-wider uppercase px-2 py-0.5 rounded"
                  >
                    {group}
                  </span>
                ))
              ) : (
                <span className="bg-[#ccff00] text-black font-extrabold text-[9px] sm:text-[10px] tracking-wider uppercase px-2 py-0.5 rounded">
                  {workout.category || "FITNESS"}
                </span>
              )}
            </div>

            {/* Title */}
            <h3 className="text-white font-black text-base sm:text-lg tracking-tight uppercase leading-snug group-hover:text-[#ccff00] transition-colors line-clamp-2">
              {workout.name || workout.title}
            </h3>

            {/* Equipment / Subtitle */}
            <p className="text-slate-400 text-[11px] sm:text-xs font-medium line-clamp-1">
              {workout.equipment || workout.description || "General Equipment"}
            </p>
          </div>
        </div>

        {/* Footer Details */}
        <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-3 border-t border-slate-800/50 flex items-center justify-between text-slate-400 text-[11px] sm:text-xs font-medium">
          <div className="flex items-center gap-1 sm:gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{workout.duration || 20} min</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-1.5">
            <Flame className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{workout.caloriesBurned || workout.calories || 180} kcal</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-1.5">
            <Star className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{workout.rating || 4.8}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}