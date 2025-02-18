"use client";

import { HabitProgress } from "@/components/habit-progress";
import { HabitTitle } from "@/components/habit-title";
import type { Habit } from "@/lib/types";
import { Inspiration } from "./inspiration";
import { HabitCompletionButtons } from "./habit-completion-buttons";

interface HabitTrackerProps {
  habit: Habit;
  onUpdateHabit: (habit: Habit) => void;
}

export function HabitTracker({ habit, onUpdateHabit }: HabitTrackerProps) {
  return (
    <div className="mt-6">
      <HabitTitle habit={habit} onUpdateHabit={onUpdateHabit} />
      <HabitProgress habit={habit} onUpdateHabit={onUpdateHabit} />
      <HabitCompletionButtons habit={habit} />
      <Inspiration />
    </div>
  );
}
