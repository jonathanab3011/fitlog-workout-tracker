'use client';

import Image from "next/image";
import { Dumbbell, Repeat, Timer } from "lucide-react";

export interface Workout {
  id: string;
  title: string;
  category?: string;
  equipment?: string;
  target?: string;
  image?: string;
  sets?: number;
  reps?: string;
  rest?: string;
}

interface WorkoutCardProps {
  workout: Workout;
}

export function WorkoutCard({ workout }: WorkoutCardProps) {
  return (
    <div className="bg-[#151821] border border-slate-800/80 rounded-2xl overflow-hidden hover:border-slate-700 transition-all flex flex-col justify-between group">
      <div>
        {/* Card Image */}
        <div className="relative aspect-[16/10] w-full bg-slate-800 overflow-hidden">
          <img
            src={workout.image || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&auto=format&fit=crop"}
            alt={workout.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Card Body */}
        <div className="p-5 space-y-3">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {workout.category && (
              <span className="bg-[#ccff00] text-black font-extrabold text-[10px] tracking-wider uppercase px-2 py-0.5 rounded">
                {workout.category}
              </span>
            )}
            {workout.equipment && (
              <span className="bg-[#ccff00] text-black font-extrabold text-[10px] tracking-wider uppercase px-2 py-0.5 rounded">
                {workout.equipment}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-white font-black text-lg tracking-tight uppercase leading-snug">
            {workout.title}
          </h3>

          {/* Subtitle / Target Muscle */}
          {workout.target && (
            <p className="text-slate-400 text-xs font-medium">{workout.target}</p>
          )}
        </div>
      </div>

      {/* Card Footer Details */}
      <div className="px-5 pb-5 pt-2 border-t border-slate-800/50 flex items-center justify-between text-slate-400 text-xs">
        <div className="flex items-center gap-1">
          <Dumbbell className="w-3.5 h-3.5 text-slate-500" />
          <span>{workout.sets || 3} Sets</span>
        </div>
        <div className="flex items-center gap-1">
          <Repeat className="w-3.5 h-3.5 text-slate-500" />
          <span>{workout.reps || "8-12"} Reps</span>
        </div>
        <div className="flex items-center gap-1">
          <Timer className="w-3.5 h-3.5 text-slate-500" />
          <span>{workout.rest || "90s"} Rest</span>
        </div>
      </div>
    </div>
  );
}

export default WorkoutCard;