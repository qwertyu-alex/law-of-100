"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Habit } from "@/lib/types";

export function HabitCompletionButtons(props: { habit: Habit }) {
  const getButtonStyles = (index: number) => {
    if (index === 99) {
      return index >= props.habit.progress
        ? "bg-white text-primary-text"
        : "bg-yellow-400 text-black";
    }
    if (index >= props.habit.progress) {
      return "bg-white text-primary-text";
    }
    return `bg-black text-white`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getButtonContent = (index: number) => {
    return index === 99 ? "⭐" : (index + 1).toString();
  };

  return (
    <div className="flex flex-wrap gap-2">
      <TooltipProvider>
        {Array.from({ length: Math.max(100, props.habit.progress) }, (_, i) => (
          <Tooltip key={i}>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                className={`w-8 h-8 p-0 ${getButtonStyles(i)}`}
              >
                {getButtonContent(i)}
              </Button>
            </TooltipTrigger>
            {i < props.habit.completions.length && (
              <TooltipContent>
                <p>{formatDate(props.habit.completions[i].date)}</p>
                {props.habit.completions[i].comment && (
                  <p className="mt-1">
                    Comment: {props.habit.completions[i].comment}
                  </p>
                )}
              </TooltipContent>
            )}
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  );
}
