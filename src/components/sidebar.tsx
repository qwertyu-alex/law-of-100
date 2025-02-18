import type React from "react";
import { addHabitAtom } from "@/atoms";
import githubIcon from "@/assets/githubicon.svg";
import { HabitList } from "@/components/habit-list";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSetAtom } from "jotai";
import { Menu } from "lucide-react";
import { useState } from "react";
import { useHabits } from "../atoms";
import { Habit } from "@/lib/types";

function SidebarContent() {
  const [newHabitName, setNewHabitName] = useState("");
  const addHabit = useSetAtom(addHabitAtom);
  const [habits, setHabits] = useHabits();

  const handleAddHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newHabitName.trim()) {
      addHabit(newHabitName.trim());
      setNewHabitName("");
    }
  };

  const handleExport = () => {
    const habitData = JSON.stringify(habits, null, 2);
    const blob = new Blob([habitData], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "habits-export.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedHabits = JSON.parse(e.target?.result as string);
        const newHabits = importedHabits.map((importedHabit: Habit) => ({
          ...importedHabit,
          id: crypto.randomUUID(),
        }));
        setHabits([...habits, ...newHabits]);
      } catch (error) {
        console.error("Error importing habits:", error);
        alert("Error importing habits. Please check the file format.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="bg-gray-100 p-4 h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Law of 100</h2>
      </div>
      <form onSubmit={handleAddHabit} className="mb-4">
        <Input
          type="text"
          value={newHabitName}
          onChange={(e) => setNewHabitName(e.target.value)}
          placeholder="New habit name"
          className="mb-2 bg-white"
        />
        <Button type="submit" className="w-full">
          Add Habit
        </Button>
      </form>
      <HabitList />

      <div className="flex flex-col gap-2 pt-2 flex-shrink-0">
        <div className="flex flex-row gap-2">
          <Button onClick={handleExport} variant="outline" className="w-full">
            Export
          </Button>

          <Button variant="outline" className="w-full" asChild>
            <label style={{ cursor: "pointer" }}>
              Import
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                style={{ display: "none" }}
              />
            </label>
          </Button>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href="https://github.com/qwertyu-alex/law-of-100"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center hover:opacity-70 transition-opacity"
              >
                <img src={githubIcon} alt="GitHub" className="h-8 w-8" />
              </a>
            </TooltipTrigger>
            <TooltipContent sideOffset={5}>
              <p>See source code</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}

export default function Sidebar() {
  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 shrink-0 h-full overflow-y-auto">
        <SidebarContent />
      </div>

      {/* Mobile Drawer */}
      <Sheet>
        <SheetTrigger asChild className="md:hidden fixed right-4 top-4 z-50">
          <Button variant="outline" size="icon" className="rounded-full">
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  );
}
