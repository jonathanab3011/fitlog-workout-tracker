'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Check, X, CheckCircle } from "lucide-react";

export default function MyPlanPage() {
  const [planWorkouts, setPlanWorkouts] = useState<any[]>([]);
  const [savedWorkouts, setSavedWorkouts] = useState<any[]>([]);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const [activeTab, setActiveTab] = useState<"todays" | "saved">("todays");
  const [sortBy, setSortBy] = useState<"duration" | "calories" | "rating">("duration");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const loadWorkouts = () => {
    try {
      const savedPlan = JSON.parse(localStorage.getItem("fitlog_plan") || "[]");
      const savedList = JSON.parse(localStorage.getItem("fitlog_saved") || "[]");

      setPlanWorkouts(savedPlan);
      setSavedWorkouts(savedList);
    } catch (error) {
      console.error("Error parsing localStorage data:", error);
    }
  };

  useEffect(() => {
    setIsMounted(true);
    loadWorkouts();

    window.addEventListener("planUpdated", loadWorkouts);
    window.addEventListener("storage", loadWorkouts);

    return () => {
      window.removeEventListener("planUpdated", loadWorkouts);
      window.removeEventListener("storage", loadWorkouts);
    };
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const currentList = activeTab === "todays" ? planWorkouts : savedWorkouts;

  const handleMarkAsDone = (id: string | number) => {
    const updated = currentList.map((item) => {
      if (String(item.id || item._id) === String(id)) {
        const newCompleted = !item.completed;
        triggerToast(
          newCompleted
            ? `"${item.name || item.title}" marked as done!`
            : `"${item.name || item.title}" marked as pending.`
        );
        return { ...item, completed: newCompleted };
      }
      return item;
    });

    if (activeTab === "todays") {
      setPlanWorkouts(updated);
      localStorage.setItem("fitlog_plan", JSON.stringify(updated));
    } else {
      setSavedWorkouts(updated);
      localStorage.setItem("fitlog_saved", JSON.stringify(updated));
    }

    window.dispatchEvent(new Event("planUpdated"));
  };

  const handleRemove = (id: string | number) => {
    const filtered = currentList.filter(
      (item) => String(item.id || item._id) !== String(id)
    );
    const removedItem = currentList.find(
      (item) => String(item.id || item._id) === String(id)
    );

    if (activeTab === "todays") {
      setPlanWorkouts(filtered);
      localStorage.setItem("fitlog_plan", JSON.stringify(filtered));
    } else {
      setSavedWorkouts(filtered);
      localStorage.setItem("fitlog_saved", JSON.stringify(filtered));
    }

    if (removedItem) {
      triggerToast(`"${removedItem.name || removedItem.title}" removed.`);
    }

    window.dispatchEvent(new Event("planUpdated"));
  };

  const sortedWorkouts = [...currentList].sort((a, b) => {
    if (sortBy === "duration") return (Number(b.duration) || 0) - (Number(a.duration) || 0);
    if (sortBy === "calories")
      return (
        (Number(b.calories || b.caloriesBurned) || 0) -
        (Number(a.calories || a.caloriesBurned) || 0)
      );
    if (sortBy === "rating") return (Number(b.rating) || 0) - (Number(a.rating) || 0);
    return 0;
  });

  const totalExercises = currentList.length;
  const totalMinutes = currentList.reduce((acc, w) => acc + (Number(w.duration) || 0), 0);
  const totalCalories = currentList.reduce(
    (acc, w) => acc + (Number(w.calories || w.caloriesBurned) || 0),
    0
  );

  if (!isMounted) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 text-center text-slate-500 font-medium">
        Loading plan...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 relative">
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#ccff00] text-black font-extrabold px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 animate-bounce border border-black/10">
          <CheckCircle className="w-5 h-5 text-black" />
          <span className="text-xs tracking-wide">{toastMessage}</span>
        </div>
      )}

      <div className="space-y-1.5">
        <h1 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">MY PLAN</h1>
        <p className="text-slate-400 text-xs sm:text-sm font-medium">Cap of five lifts for today. Finish there, then load more.</p>
      </div>

      <div className="bg-[#151821] border border-slate-800/80 rounded-2xl p-6 grid grid-cols-3 gap-4">
        <div>
          <p className="text-[11px] font-semibold text-slate-500 uppercase mb-1">Exercises</p>
          <p className="text-3xl font-black text-[#ccff00]">{totalExercises}</p>
        </div>
        <div>
          <p className="text-[11px] font-semibold text-slate-500 uppercase mb-1">Minutes</p>
          <p className="text-3xl font-black text-white">{totalMinutes}</p>
        </div>
        <div>
          <p className="text-[11px] font-semibold text-slate-500 uppercase mb-1">Calories</p>
          <p className="text-3xl font-black text-white">{totalCalories}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="bg-[#151821] p-1 rounded-xl border border-slate-800/80 flex items-center gap-1">
          <button
            onClick={() => setActiveTab("todays")}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === "todays" ? "bg-[#212634] text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            Today's Plan ({planWorkouts.length})
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === "saved" ? "bg-[#212634] text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            Saved ({savedWorkouts.length})
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>Sort by</span>
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

      {sortedWorkouts.length > 0 ? (
        <div className="space-y-4">
          {sortedWorkouts.map((workout) => {
            const id = workout.id || workout._id;
            const img = workout.image || workout.imageUrl || workout.img || workout.thumbnail || "/banner.png";
            return (
              <div
                key={id}
                className={`bg-[#151821] border ${
                  workout.completed ? "border-[#ccff00]/40 bg-[#151821]/60" : "border-slate-800/80"
                } rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all`}
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <img src={img} alt={workout.name || workout.title} className="w-16 h-16 rounded-xl object-cover bg-slate-900" />
                  <div>
                    <h3 className={`text-base font-black text-white ${workout.completed ? "line-through text-slate-400" : ""}`}>
                      {workout.name || workout.title}
                    </h3>
                    <div className="flex gap-4 text-xs text-slate-400 mt-1 font-medium">
                      <span>{workout.duration || 20} min</span>
                      <span>•</span>
                      <span>{workout.calories || workout.caloriesBurned || 150} kcal</span>
                      <span>•</span>
                      <span className="text-[#ccff00]">★ {workout.rating || 4.5}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => handleMarkAsDone(id)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                      workout.completed ? "bg-[#ccff00] text-black" : "bg-slate-800 hover:bg-slate-700 text-slate-200"
                    }`}
                  >
                    <Check className="w-4 h-4" />
                    {workout.completed ? "Done" : "Mark as Done"}
                  </button>
                  <button
                    onClick={() => handleRemove(id)}
                    className="p-2 bg-slate-800/80 hover:bg-red-500/20 hover:text-red-400 text-slate-400 rounded-xl transition-all cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-[#151821]/40 border border-dashed border-slate-800/80 rounded-3xl p-16 text-center flex flex-col items-center justify-center space-y-4 min-h-[320px]">
          <h2 className="text-lg sm:text-xl font-black text-white uppercase tracking-wider">NOTHING HERE YET</h2>
          <p className="text-slate-400 text-xs sm:text-sm font-medium max-w-sm">
            {activeTab === "todays" ? "Browse the library and add a lift to get today moving." : "You have no saved workouts yet."}
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