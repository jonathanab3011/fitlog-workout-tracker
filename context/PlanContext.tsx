'use client';

import React, { createContext, useContext, useState, useEffect } from "react";
import { Workout } from "@/types/workout";
import { showToast } from "@/components/GlobalToast";

interface PlanContextType {
  planWorkouts: Workout[];
  savedWorkouts: Workout[];
  addToPlan: (workout: Workout) => void;
  saveForLater: (workout: Workout) => void;
  removeFromPlan: (id: string | number) => void;
  removeFromSaved: (id: string | number) => void;
  toggleComplete: (id: string | number) => void;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export function PlanProvider({ children }: { children: React.ReactNode }) {
  const [planWorkouts, setPlanWorkouts] = useState<Workout[]>([]);
  const [savedWorkouts, setSavedWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    try {
      const storedPlan = JSON.parse(localStorage.getItem("fitlog_plan") || "[]");
      const storedSaved = JSON.parse(localStorage.getItem("fitlog_saved") || "[]");
      setPlanWorkouts(storedPlan);
      setSavedWorkouts(storedSaved);
    } catch (error) {
      console.error("Error loading stored plan data:", error);
    }
  }, []);

  const savePlanToStorage = (updated: Workout[]) => {
    setPlanWorkouts(updated);
    localStorage.setItem("fitlog_plan", JSON.stringify(updated));
    window.dispatchEvent(new Event("planUpdated"));
  };

  const saveSavedToStorage = (updated: Workout[]) => {
    setSavedWorkouts(updated);
    localStorage.setItem("fitlog_saved", JSON.stringify(updated));
    window.dispatchEvent(new Event("planUpdated"));
  };

  const addToPlan = (workout: Workout) => {
    const workoutId = workout.id || workout._id;
    const exists = planWorkouts.some(
      (item) => String(item.id || item._id) === String(workoutId)
    );

    const title = workout.name || workout.title || "Workout";

    if (!exists) {
      savePlanToStorage([...planWorkouts, workout]);
      showToast(`"${title}" added to Today's Plan!`);
    } else {
      showToast(`"${title}" is already in your Plan!`);
    }
  };

  const saveForLater = (workout: Workout) => {
    const workoutId = workout.id || workout._id;
    const exists = savedWorkouts.some(
      (item) => String(item.id || item._id) === String(workoutId)
    );

    const title = workout.name || workout.title || "Workout";

    if (!exists) {
      saveSavedToStorage([...savedWorkouts, workout]);
      showToast(`"${title}" saved for later!`);
    } else {
      showToast(`"${title}" is already in Saved!`);
    }
  };

  const removeFromPlan = (id: string | number) => {
    const target = planWorkouts.find(
      (item) => String(item.id || item._id) === String(id)
    );
    const updated = planWorkouts.filter(
      (item) => String(item.id || item._id) !== String(id)
    );
    savePlanToStorage(updated);
    if (target) {
      showToast(`"${target.name || target.title}" removed from Plan.`);
    }
  };

  const removeFromSaved = (id: string | number) => {
    const target = savedWorkouts.find(
      (item) => String(item.id || item._id) === String(id)
    );
    const updated = savedWorkouts.filter(
      (item) => String(item.id || item._id) !== String(id)
    );
    saveSavedToStorage(updated);
    if (target) {
      showToast(`"${target.name || target.title}" removed from Saved.`);
    }
  };

  const toggleComplete = (id: string | number) => {
    const updated = planWorkouts.map((item) => {
      if (String(item.id || item._id) === String(id)) {
        if (item.completed) return item;
        showToast(`"${item.name || item.title}" marked as done!`);
        return { ...item, completed: true };
      }
      return item;
    });
    savePlanToStorage(updated);
  };

  return (
    <PlanContext.Provider
      value={{
        planWorkouts,
        savedWorkouts,
        addToPlan,
        saveForLater,
        removeFromPlan,
        removeFromSaved,
        toggleComplete,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error("usePlan must be used within a PlanProvider");
  }
  return context;
}