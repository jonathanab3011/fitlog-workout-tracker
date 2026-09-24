"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import toast from "react-hot-toast";
import { Workout } from "@/types/workout";

interface PlanContextType {
  todayPlan: Workout[];
  savedList: Workout[];
  completedIds: number[];
  addToPlan: (workout: Workout) => void;
  addToSaved: (workout: Workout) => void;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  toggleMarkAsDone: (id: number) => void;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export function PlanProvider({ children }: { children: ReactNode }) {
  const [todayPlan, setTodayPlan] = useState<Workout[]>([]);
  const [savedList, setSavedList] = useState<Workout[]>([]);
  const [completedIds, setCompletedIds] = useState<number[]>([]);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // LocalStorage sync
  useEffect(() => {
    const localPlan = localStorage.getItem("fitlog_today_plan");
    const localSaved = localStorage.getItem("fitlog_saved_list");
    const localDone = localStorage.getItem("fitlog_completed");

    if (localPlan) setTodayPlan(JSON.parse(localPlan));
    if (localSaved) setSavedList(JSON.parse(localSaved));
    if (localDone) setCompletedIds(JSON.parse(localDone));

    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("fitlog_today_plan", JSON.stringify(todayPlan));
      localStorage.setItem("fitlog_saved_list", JSON.stringify(savedList));
      localStorage.setItem("fitlog_completed", JSON.stringify(completedIds));
    }
  }, [todayPlan, savedList, completedIds, isMounted]);

  const addToPlan = (workout: Workout) => {
    if (todayPlan.some((item) => item.id === workout.id)) {
      toast.error("Already in Today's Plan!");
      return;
    }
    if (todayPlan.length >= 5) {
      toast.error("Cap reached! Today's plan is limited to 5 lifts.");
      return;
    }
    setTodayPlan((prev) => [...prev, workout]);
    toast.success(`Added "${workout.name}" to today's plan!`);
  };

  const addToSaved = (workout: Workout) => {
    if (savedList.some((item) => item.id === workout.id)) {
      toast.error("Already saved for later!");
      return;
    }
    setSavedList((prev) => [...prev, workout]);
    toast.success(`Saved "${workout.name}" for later!`);
  };

  const removeFromPlan = (id: number) => {
    setTodayPlan((prev) => prev.filter((item) => item.id !== id));
    toast.success("Removed from Today's Plan");
  };

  const removeFromSaved = (id: number) => {
    setSavedList((prev) => prev.filter((item) => item.id !== id));
    toast.success("Removed from Saved list");
  };

  const toggleMarkAsDone = (id: number) => {
    if (completedIds.includes(id)) {
      setCompletedIds((prev) => prev.filter((item) => item !== id));
      toast("Marked as incomplete");
    } else {
      setCompletedIds((prev) => [...prev, id]);
      toast.success("Workout marked as DONE! 💪");
    }
  };

  return (
    <PlanContext.Provider
      value={{
        todayPlan,
        savedList,
        completedIds,
        addToPlan,
        addToSaved,
        removeFromPlan,
        removeFromSaved,
        toggleMarkAsDone,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export const usePlan = (): PlanContextType => {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error("usePlan must be used within a PlanProvider");
  }
  return context;
};