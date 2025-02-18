"use client";

import { getSelectedHabit } from "@/atoms";
import { HabitTracker } from "@/components/habit-tracker";
import { useAtomValue } from "jotai";
import Sidebar from "./components/sidebar";

export default function App() {
  const selectedHabit = useAtomValue(getSelectedHabit);

  return (
    <div className="h-screen overflow-clip">
      <div className="flex h-full w-full">
        <div className="h-full overflow-y-auto">
          <Sidebar />
        </div>
        <main className="flex-1 p-4 md:p-6">
          {selectedHabit && <HabitTracker />}
        </main>
      </div>
    </div>
  );
}
