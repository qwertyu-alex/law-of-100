"use client";

import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import type { Habit } from "@/lib/types";

interface HabitTitleProps {
  habit: Habit;
  onUpdateHabit: (habit: Habit) => void;
}

export function HabitTitle({ habit, onUpdateHabit }: HabitTitleProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(habit.name);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedName(e.target.value);
  };

  const handleNameSubmit = () => {
    if (editedName.trim() !== "") {
      onUpdateHabit({ ...habit, name: editedName.trim() });
    } else {
      setEditedName(habit.name);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleNameSubmit();
    } else if (e.key === "Escape") {
      setEditedName(habit.name);
      setIsEditing(false);
    }
  };

  return isEditing ? (
    <Input
      ref={inputRef}
      value={editedName}
      onChange={handleNameChange}
      onBlur={handleNameSubmit}
      onKeyDown={handleKeyDown}
      className="text-2xl font-bold mb-4"
    />
  ) : (
    <h2
      className="text-2xl font-bold mb-4 cursor-pointer"
      onDoubleClick={handleDoubleClick}
    >
      {habit.name}
    </h2>
  );
}
