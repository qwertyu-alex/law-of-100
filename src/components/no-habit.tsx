import { useAtomValue, useSetAtom } from "jotai";
import { AddHabitForm } from "./add-habit-form";
import { addHabitAtom, habitsAtom } from "@/atoms";

export function NoHabit() {
  const habits = useAtomValue(habitsAtom);
  const addHabit = useSetAtom(addHabitAtom);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      {habits.length > 0 && (
        <div className="flex flex-col items-center justify-center h-full">
          <label className="text-sm text-gray-500">
            Select a habit to get started
          </label>
        </div>
      )}

      {habits.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full gap-2">
          <label className="text-sm text-gray-500">
            Add a new habit to get started
          </label>
          <AddHabitForm onAddHabit={addHabit} />
        </div>
      )}
    </div>
  );
}
