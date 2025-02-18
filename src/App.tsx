"use client";

import { HabitTracker } from "@/components/habit-tracker";
import { Sidebar } from "@/components/sidebar";
import type { Habit } from "@/lib/types";
import { useEffect, useState } from "react";

export default function Home() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);

  useEffect(() => {
    const storedHabits = localStorage.getItem("habits");
    if (storedHabits) {
      const parsedHabits = JSON.parse(storedHabits);
      setHabits(parsedHabits);
      if (parsedHabits.length > 0) {
        setSelectedHabit(parsedHabits[0]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  const addHabit = (name: string) => {
    const newHabit: Habit = {
      id: Date.now(),
      name,
      progress: 0,
      completions: [],
    };
    setHabits([...habits, newHabit]);
    if (!selectedHabit) {
      setSelectedHabit(newHabit);
    }
  };

  const updateHabit = (updatedHabit: Habit) => {
    const updatedHabits = habits.map((habit) =>
      habit.id === updatedHabit.id ? updatedHabit : habit
    );
    setHabits(updatedHabits);
    if (selectedHabit && selectedHabit.id === updatedHabit.id) {
      setSelectedHabit(updatedHabit);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        habits={habits}
        selectedHabit={selectedHabit}
        onSelectHabit={setSelectedHabit}
        onAddHabit={addHabit}
        onUpdateHabit={updateHabit}
      />
      <main className="flex-1 p-6">
        {selectedHabit && (
          <HabitTracker habit={selectedHabit} onUpdateHabit={updateHabit} />
        )}
      </main>
    </div>
  );
}
