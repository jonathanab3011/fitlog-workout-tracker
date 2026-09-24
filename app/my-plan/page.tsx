'use client';

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Check, X, CheckCircle } from "lucide-react";

interface PlannedWorkout {
  id: string | number;
  name: string;
  duration: number; // in mins
  calories: number;
  rating: number;
  completed: boolean;
  image: string;
}

export default function MyPlanPage() {
  // Sample Initial Data
  const [workouts, setWorkouts] = useState<PlannedWorkout[]>([
    {
      id: "1",
      name: "Barbell Bench Press",
      duration: 25,
      calories: 190,
      rating: 4.8,
      completed: false,
      image: "/banner.png",
    },
    {
      id: "2",
      name: "Incline Dumbbell Press",
      duration: 18,
      calories: 140,
      rating: 4.5,
      completed: false,
      image: "/banner.png",
    },
  ]);

  const [activeTab, setActiveTab] = useState<"todays" | "saved">("todays");
  const [sortBy, setSortBy] = useState<"duration" | "calories" | "rating">("duration");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Helper function to trigger Toast
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // C3: Mark as Done Handler
  const handleMarkAsDone = (id: string | number) => {
    setWorkouts((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newCompletedState = !item.completed;
          triggerToast(
            newCompletedState
              ? `"${item.name}" marked as done!`
              : `"${item.name}" marked as pending.`
          );
          return { ...item, completed: newCompletedState };
        }
        return item;
      })
    );
  };

  // C3: Remove Handler
  const handleRemove = (id: string | number) => {
    const itemToRemove = workouts.find((item) => item.id === id);
    setWorkouts((prev) => prev.filter((item) => item.id !== id));
    if (itemToRemove) {
      triggerToast(`"${itemToRemove.name}" removed from plan.`);
    }
  };

  // C1: Sort Workouts List
  const sortedWorkouts = [...workouts].sort((a, b) => {
    if (sortBy === "duration") return b.duration - a.duration;
    if (sortBy === "calories") return b.calories - a.calories;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  // Calculate Summary Stats
  const totalExercises = workouts.length;
  const totalMinutes = workouts.reduce((acc, w) => acc + w.duration, 0);
  const totalCalories = workouts.reduce((acc, w) => acc + w.calories, 0);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#ccff00] text-black font-extrabold px-5 py-3 rounded-2xl shadow-2xl border border-black/10 flex items-center gap-2 animate-bounce">
          <CheckCircle className="w-5 h-5 text-black" />
          <span className="text-xs tracking-wide">{toastMessage}</span>
        </div>
      )}

      {/* Page Title & Subtitle */}
      <div className="space-y-1.5">
        <h1 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
          MY PLAN
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm font-medium">
          Cap of five lifts for today. Finish there, then load more.
        </p>
      </div>

      {/* Summary Stats Box */}
      <div className="bg-[#151821] border border-slate-800/80 rounded-2xl p-6 grid grid-cols-3 gap-4">
        <div>
          <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Exercises
          </p>
          <p className="text-3xl font-black text-[#ccff00]">{totalExercises}</p>
        </div>
        <div>
          <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Minutes
          </p>
          <p className="text-3xl font-black text-white">{totalMinutes}</p>
        </div>
        <div>
          <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Calories
          </p>
          <p className="text-3xl font-black text-white">{totalCalories}</p>
        </div>
      </div>

      {/* Filter Tabs & C1: Sort Dropdown */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Toggle Tabs */}
        <div className="bg-[#151821] p-1 rounded-xl border border-slate-800/80 flex items-center gap-1">
          <button
            onClick={() => setActiveTab("todays")}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === "todays"
                ? "bg-[#212634] text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Today's Plan
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === "saved"
                ? "bg-[#212634] text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Saved
          </button>
        </div>

        {/* C1: Sort Dropdown */}
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="font-medium">Sort by</span>
          <div className="relative inline-block">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#151821] border border-slate-800/80 text-slate-200 font-semibold pl-3 pr-8 py-1.5 rounded-lg appearance-none focus:outline-none focus:border-[#ccff00] text-xs cursor-pointer"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* C3: Planned Workout List */}
      {sortedWorkouts.length > 0 ? (
        <div className="space-y-4">
          {sortedWorkouts.map((workout) => (
            <div
              key={workout.id}
              className={`bg-[#151821] border ${
                workout.completed ? "border-[#ccff00]/40 bg-[#151821]/60" : "border-slate-800/80"
              } rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all`}
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <img
                  src={workout.image || "/banner.png"}
                  alt={workout.name}
                  className="w-16 h-16 rounded-xl object-cover bg-slate-900"
                />
                <div>
                  <h3 className={`text-base font-black text-white ${workout.completed ? "line-through text-slate-400" : ""}`}>
                    {workout.name}
                  </h3>
                  <div className="flex gap-4 text-xs text-slate-400 mt-1 font-medium">
                    <span>{workout.duration} min</span>
                    <span>•</span>
                    <span>{workout.calories} kcal</span>
                    <span>•</span>
                    <span className="text-[#ccff00]">★ {workout.rating}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                {/* Mark as Done Button */}
                <button
                  onClick={() => handleMarkAsDone(workout.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all ${
                    workout.completed
                      ? "bg-[#ccff00] text-black"
                      : "bg-slate-800 hover:bg-slate-700 text-slate-200"
                  }`}
                >
                  <Check className="w-4 h-4" />
                  {workout.completed ? "Done" : "Mark as Done"}
                </button>

                {/* Remove (X) Button */}
                <button
                  onClick={() => handleRemove(workout.id)}
                  className="p-2 bg-slate-800/80 hover:bg-red-500/20 hover:text-red-400 text-slate-400 rounded-xl transition-all"
                  title="Remove Workout"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-[#151821]/40 border border-dashed border-slate-800/80 rounded-3xl p-16 text-center flex flex-col items-center justify-center space-y-4 min-h-[320px]">
          <h2 className="text-lg sm:text-xl font-black text-white uppercase tracking-wider">
            NOTHING HERE YET
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm font-medium max-w-sm">
            Browse the library and add a lift to get today moving.
          </p>
          <div className="pt-2">
            <Link
              href="/"
              className="inline-block bg-[#ccff00] hover:bg-[#b8e600] text-black font-extrabold text-xs uppercase px-6 py-3 rounded-full transition-all shadow-md shadow-[#ccff00]/10"
            >
              Go to workouts
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}