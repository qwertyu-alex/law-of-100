import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import ConfettiExplosion from "react-confetti-explosion";
import { Habit } from "@/lib/types";
import { updateHabitAtom } from "@/atoms";
import { useSetAtom } from "jotai";
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

export function HabitProgress(props: { habit: Habit }) {
  const [comment, setComment] = useState("");
  const [isCommentActive, setIsCommentActive] = useState(false);
  const [isExploding, setIsExploding] = useState(false);
  const [showDecreaseConfirm, setShowDecreaseConfirm] = useState(false);
  const commentInputRef = useRef<HTMLInputElement>(null);
  const [randomKey, setRandomKey] = useState(Math.random());

  const onUpdateHabit = useSetAtom(updateHabitAtom);

  useEffect(() => {
    if (isCommentActive && commentInputRef.current) {
      commentInputRef.current.focus();
    }
  }, [isCommentActive]);

  const handleClick = () => {
    setIsExploding(false);
    setRandomKey(Math.random());
    const updatedHabit = {
      ...props.habit,
      progress: props.habit.progress + 1,
      completions: [
        ...props.habit.completions,
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

  const handleDecrease = () => {
    const updatedHabit = {
      ...props.habit,
      progress: Math.max(0, props.habit.progress - 1),
    };
    onUpdateHabit(updatedHabit);
    setShowDecreaseConfirm(false);
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
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowDecreaseConfirm(true)}
              disabled={props.habit.progress === 0}
            >
              -1
            </Button>
            <div className="relative">
              <Button onClick={handleClick}>+1 Done</Button>
              {isExploding && (
                <div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  key={isExploding ? randomKey : undefined}
                >
                  <ConfettiExplosion
                    force={0.8}
                    duration={2500}
                    particleCount={100}
                    width={1600}
                    onComplete={() => setIsExploding(false)}
                    key={isExploding ? randomKey : undefined}
                  />
                </div>
              )}
            </div>
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

      <AlertDialog
        open={showDecreaseConfirm}
        onOpenChange={setShowDecreaseConfirm}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Decrease Progress?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to decrease the progress for "
              {props.habit.name}"? This will remove one completion from your
              progress.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDecrease}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Decrease
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
