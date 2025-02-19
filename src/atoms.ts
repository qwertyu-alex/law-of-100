import { atomWithStorage } from "jotai/utils";
import { Habit } from "./lib/types";
import { atom } from "jotai";
import { useAtom } from "jotai";

export const habitsAtom = atomWithStorage<Habit[]>("habits", []);
const selectedHabitIdAtom = atomWithStorage<number | null>(
  "selectedHabitId",
  null
);

export const getSelectedHabit = atom((get) => {
  const habits = get(habitsAtom);
  const selectedHabitId = get(selectedHabitIdAtom);
  if (!selectedHabitId) return null;

  return habits.find((habit) => habit.id === selectedHabitId) ?? null;
});

export const setSelectedHabitId = atom(
  null,
  (_, set, habitId: number | null) => {
    set(selectedHabitIdAtom, habitId);
  }
);

export const addHabitAtom = atom(null, (get, set, name: string) => {
  const habits = get(habitsAtom);
  const newHabit: Habit = {
    id: Date.now(),
    name,
    progress: 0,
    completions: [],
  };
  set(habitsAtom, [...habits, newHabit]);
  set(selectedHabitIdAtom, newHabit.id);
});

export const updateHabitAtom = atom(null, (get, set, updatedHabit: Habit) => {
  const habits = get(habitsAtom);
  const updatedHabits = habits.map((habit) =>
    habit.id === updatedHabit.id ? updatedHabit : habit
  );
  set(habitsAtom, updatedHabits);
});

export const increaseHabitProgressAtom = atom(
  null,
  (get, set, habitId: number) => {
    const habits = get(habitsAtom);
    const updatedHabits = habits.map((habit) =>
      habit.id === habitId ? { ...habit, progress: habit.progress + 1 } : habit
    );
    set(habitsAtom, updatedHabits);
  }
);

export const decreaseHabitProgressAtom = atom(
  null,
  (get, set, habitId: number) => {
    const habits = get(habitsAtom);
    const updatedHabits = habits.map((habit) =>
      habit.id === habitId
        ? { ...habit, progress: Math.max(0, habit.progress - 1) }
        : habit
    );
    set(habitsAtom, updatedHabits);
  }
);

export const deleteHabitAtom = atom(null, (get, set, habitId: number) => {
  const habits = get(habitsAtom);
  set(
    habitsAtom,
    habits.filter((h) => h.id !== habitId)
  );

  // If the deleted habit was selected, clear the selection
  const selectedId = get(selectedHabitIdAtom);
  if (selectedId === habitId) {
    set(selectedHabitIdAtom, null);
  }
});

export const useHabits = () => {
  return useAtom(habitsAtom);
};
