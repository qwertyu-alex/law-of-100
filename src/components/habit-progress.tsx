"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Habit } from "@/lib/types";
import { cn } from "@/lib/utils";
import ConfettiExplosion from "react-confetti-explosion";

interface HabitProgressProps {
  habit: Habit;
  onUpdateHabit: (habit: Habit) => void;
}

export function HabitProgress({ habit, onUpdateHabit }: HabitProgressProps) {
  const [comment, setComment] = useState("");
  const [isCommentActive, setIsCommentActive] = useState(false);
  const [isExploding, setIsExploding] = useState(false);
  const commentInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isCommentActive && commentInputRef.current) {
      commentInputRef.current.focus();
    }
  }, [isCommentActive]);

  const handleClick = () => {
    const updatedHabit = {
      ...habit,
      progress: habit.progress + 1,
      completions: [
        ...habit.completions,
        {
          date: new Date().toISOString(),
          comment: comment.trim() || undefined,
        },
      ],
    };
    onUpdateHabit(updatedHabit);
    setComment("");
    setIsExploding(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div className="flex-1 mr-2 flex gap-2 w-full">
          <div className="relative">
            <Button onClick={handleClick}>+1 Done</Button>
            {isExploding && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <ConfettiExplosion
                  force={0.8}
                  duration={2500}
                  particleCount={100}
                  width={1600}
                  onComplete={() => setIsExploding(false)}
                />
              </div>
            )}
          </div>
          <div className={cn("relative", isCommentActive && "w-full")}>
            <Input
              ref={commentInputRef}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onFocus={() => setIsCommentActive(true)}
              onBlur={() => setIsCommentActive(false)}
              onKeyDown={handleKeyDown}
              placeholder={
                isCommentActive ? "Add a comment (optional)" : "Add a comment"
              }
              className={`transition-all duration-300 ${
                isCommentActive ? "w-full" : "w-32"
              }`}
            />
          </div>
        </div>
      </div>
    </>
  );
}
