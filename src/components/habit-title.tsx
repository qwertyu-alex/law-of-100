"use client";

import { updateHabitAtom } from "@/atoms";
import { Input } from "@/components/ui/input";
import { Habit } from "@/lib/types";
import { useSetAtom } from "jotai";
import { useEffect, useRef, useState } from "react";

export function HabitTitle(props: { habit: Habit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(props.habit.name);
  const inputRef = useRef<HTMLInputElement>(null);

  const onUpdateHabit = useSetAtom(updateHabitAtom);

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
      onUpdateHabit({ ...props.habit, name: editedName.trim() });
    } else {
      setEditedName(props.habit.name);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleNameSubmit();
    } else if (e.key === "Escape") {
      setEditedName(props.habit.name);
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
      {props.habit.name}
    </h2>
  );
}
