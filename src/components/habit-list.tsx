import {
  deleteHabitAtom,
  getSelectedHabit,
  habitsAtom,
  increaseHabitProgressAtom,
  setSelectedHabitId,
} from "@/atoms";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Habit } from "@/lib/types";
import { useAtomValue, useSetAtom } from "jotai";
import { Trash2, Plus } from "lucide-react";
import { useState } from "react";

export function HabitList() {
  const increaseHabitProgress = useSetAtom(increaseHabitProgressAtom);
  const deleteHabit = useSetAtom(deleteHabitAtom);
  const habits = useAtomValue(habitsAtom);
  const selectedHabit = useAtomValue(getSelectedHabit);
  const setSelectedHabit = useSetAtom(setSelectedHabitId);

  const [habitToDelete, setHabitToDelete] = useState<Habit | null>(null);

  const renderMinimap = (habit: Habit) => {
    const totalCircles = 100;
    const completedCircles = habit.progress;
    const circleSize = 8;

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

  const handleDeleteClick = (e: React.MouseEvent, habit: Habit) => {
    e.stopPropagation();
    setHabitToDelete(habit);
  };

  const handleConfirmDelete = () => {
    if (habitToDelete) {
      deleteHabit(habitToDelete.id);
      setHabitToDelete(null);
    }
  };

  return (
    <>
      <ScrollArea>
        {habits.map((habit) => (
          <Card
            key={habit.id}
            className={`mb-4 cursor-pointer group relative ${
              selectedHabit?.id === habit.id ? "border-primary" : ""
            }`}
            onClick={() => setSelectedHabit(habit.id)}
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
                onClick={(e) => {
                  e.stopPropagation();
                  increaseHabitProgress(habit.id);
                }}
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
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => handleDeleteClick(e, habit)}
                className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="h-4 w-4 text-destructive" />
                <span className="sr-only">Delete {habit.name}</span>
              </Button>
            </CardContent>
          </Card>
        ))}
      </ScrollArea>

      <AlertDialog
        open={habitToDelete !== null}
        onOpenChange={() => setHabitToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete "{habitToDelete?.name}" and all of
              its progress data. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
