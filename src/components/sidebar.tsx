import type React from "react";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Habit } from "@/lib/types";
import { Plus } from "lucide-react";

interface SidebarProps {
  habits: Habit[];
  selectedHabit: Habit | null;
  onSelectHabit: (habit: Habit) => void;
  onAddHabit: (name: string) => void;
  onUpdateHabit: (habit: Habit) => void;
}

export function Sidebar({
  habits,
  selectedHabit,
  onSelectHabit,
  onAddHabit,
  onUpdateHabit,
}: SidebarProps) {
  const [newHabitName, setNewHabitName] = useState("");

  const handleAddHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newHabitName.trim()) {
      onAddHabit(newHabitName.trim());
      setNewHabitName("");
    }
  };

  const handleIncrementHabit = (habit: Habit, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event
    const updatedHabit = {
      ...habit,
      progress: habit.progress + 1,
      completions: [...habit.completions, { date: new Date().toISOString() }],
    };
    onUpdateHabit(updatedHabit);
  };

  const renderMinimap = (habit: Habit) => {
    const totalCircles = 100;
    const completedCircles = habit.progress;
    const circleSize = 8; // Size of each circle in pixels

    return (
      <div className="flex flex-wrap gap-[1px] mt-2 w-full">
        {Array.from({ length: totalCircles }, (_, index) => (
          <div
            key={index}
            className={`rounded-full ${
              index < completedCircles ? "bg-primary" : "bg-gray-200"
            }`}
            style={{ width: `${circleSize}px`, height: `${circleSize}px` }}
          ></div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-gray-100 p-4 w-64">
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
      <ScrollArea className="h-[calc(100vh-12rem)]">
        {habits.map((habit) => (
          <Card
            key={habit.id}
            className={`mb-4 cursor-pointer ${
              selectedHabit?.id === habit.id ? "border-primary" : ""
            }`}
            onClick={() => onSelectHabit(habit)}
          >
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
              <div>
                <CardTitle className="text-sm font-medium">
                  {habit.name}
                </CardTitle>
                <p className="text-xs text-muted-foreground mt-1">
                  Progress: {habit.progress}/100
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => handleIncrementHabit(habit, e)}
                className="h-8 w-8"
              >
                <Plus className="h-4 w-4" />
                <span className="sr-only">Increment {habit.name}</span>
              </Button>
            </CardHeader>
            <CardContent>
              {renderMinimap(habit)}
              <p className="text-xs text-muted-foreground mt-2">
                Last completed:{" "}
                {habit.completions.length > 0
                  ? new Date(
                      habit.completions[habit.completions.length - 1].date
                    ).toLocaleDateString()
                  : "Never"}
              </p>
            </CardContent>
          </Card>
        ))}
      </ScrollArea>
    </div>
  );
}
