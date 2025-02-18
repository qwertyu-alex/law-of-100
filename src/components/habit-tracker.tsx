"use client";

import { HabitProgress } from "@/components/habit-progress";
import { HabitTitle } from "@/components/habit-title";
import { HabitCompletionButtons } from "./habit-completion-buttons";
import { Inspiration } from "./inspiration";

import { getSelectedHabit } from "@/atoms";
import { useAtomValue } from "jotai";

export function HabitTracker() {
  const selectedHabit = useAtomValue(getSelectedHabit);

  if (!selectedHabit) return null;

  return (
    <div className="mt-6">
      <HabitTitle habit={selectedHabit} />
      <HabitProgress habit={selectedHabit} />
      <HabitCompletionButtons habit={selectedHabit} />
      <Inspiration />
    </div>
  );
}
