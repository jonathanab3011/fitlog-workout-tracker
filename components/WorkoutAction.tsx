'use client';

import { Calendar, Bookmark } from "lucide-react";
import { showToast } from "@/components/GlobalToast";

interface WorkoutActionProps {
  workout: any;
}

export default function WorkoutAction({ workout }: WorkoutActionProps) {
  const handleAddToPlan = () => {
    try {
      const existingPlan = JSON.parse(localStorage.getItem("fitlog_plan") || "[]");

      // Check for 5-lift cap requirement
      if (existingPlan.length >= 5) {
        showToast("Plan cap reached! You can only add up to 5 lifts for today.");
        return;
      }

      const exists = existingPlan.some(
        (item: any) => String(item.id || item._id) === String(workout.id || workout._id)
      );

      const title = workout.name || workout.title || workout.workoutName || 'Workout';

      if (!exists) {
        const updated = [...existingPlan, workout];
        localStorage.setItem("fitlog_plan", JSON.stringify(updated));
        showToast(`"${title}" added to Today's Plan!`);
      } else {
        showToast(`"${title}" is already in your Plan!`);
      }

      window.dispatchEvent(new Event("planUpdated"));
    } catch (error) {
      console.error("Error adding to plan:", error);
    }
  };

  const handleSaveForLater = () => {
    try {
      const existingSaved = JSON.parse(localStorage.getItem("fitlog_saved") || "[]");
      const exists = existingSaved.some(
        (item: any) => String(item.id || item._id) === String(workout.id || workout._id)
      );

      const title = workout.name || workout.title || workout.workoutName || 'Workout';

      if (!exists) {
        const updated = [...existingSaved, workout];
        localStorage.setItem("fitlog_saved", JSON.stringify(updated));
        showToast(`"${title}" saved for later!`);
      } else {
        showToast(`"${title}" is already in Saved!`);
      }

      window.dispatchEvent(new Event("planUpdated"));
    } catch (error) {
      console.error("Error saving workout:", error);
    }
  };

  return (
    <div className="pt-2 sm:pt-4">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
        <button 
          onClick={handleAddToPlan}
          className="w-full sm:w-auto bg-[#ccff00] hover:bg-[#b8e600] text-black font-extrabold text-xs uppercase px-5 py-3.5 sm:py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-[#ccff00]/10 cursor-pointer active:scale-95 shrink-0"
        >
          <Calendar className="w-4 h-4 shrink-0" />
          <span>Add to today's plan</span>
        </button>

        <button 
          onClick={handleSaveForLater}
          className="w-full sm:w-auto bg-[#151821] hover:bg-slate-800 border border-slate-800 text-slate-300 font-bold text-xs uppercase px-5 py-3.5 sm:py-3 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer active:scale-95 shrink-0"
        >
          <Bookmark className="w-4 h-4 shrink-0" />
          <span>Save for later</span>
        </button>
      </div>
    </div>
  );
}