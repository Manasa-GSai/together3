import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Task, Buddy } from '@/types/app';
import { cn } from '@/lib/utils';

interface FocusSessionProps {
  task: Task;
  buddy: Buddy | null;
  onComplete: (completed: boolean) => void;
}

export function FocusSession({ task, buddy, onComplete }: FocusSessionProps) {
  const [secondsLeft, setSecondsLeft] = useState(task.duration * 60);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleFinish(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handleFinish = (completed: boolean) => {
    setIsTransitioning(true);
    setTimeout(() => {
      onComplete(completed);
    }, 500);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((task.duration * 60 - secondsLeft) / (task.duration * 60)) * 100;

  return (
    <div className={cn(
      "flex flex-col items-center justify-center min-h-screen px-6 py-12 transition-opacity duration-500",
      isTransitioning && "opacity-0"
    )}>
      <div className="max-w-md w-full text-center animate-fade-in">
        {/* Buddy presence indicator */}
        {buddy && (
          <div className="mb-8 animate-slide-up">
            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-secondary/50 border border-secondary">
              <span className="text-2xl">{buddy.emoji}</span>
              <span className="text-secondary-foreground font-medium">
                {buddy.name} is here with you
              </span>
              <span className="w-2 h-2 rounded-full bg-accent breathing" />
            </div>
          </div>
        )}

        {/* Timer */}
        <div className="relative mb-8">
          <div className="w-48 h-48 mx-auto relative">
            {/* Background circle */}
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="88"
                fill="none"
                stroke="hsl(var(--muted))"
                strokeWidth="8"
              />
              <circle
                cx="96"
                cy="96"
                r="88"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 88}
                strokeDashoffset={2 * Math.PI * 88 * (1 - progress / 100)}
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-semibold text-foreground">
                {formatTime(secondsLeft)}
              </span>
              <span className="text-sm text-muted-foreground mt-1">remaining</span>
            </div>
          </div>
        </div>

        {/* Task display */}
        <div className="mb-10 p-5 rounded-2xl bg-card border border-border">
          <p className="text-sm text-muted-foreground mb-1">working on:</p>
          <p className="text-lg font-medium text-foreground">{task.title}</p>
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            <Button
              variant="soft"
              size="lg"
              className="flex-1"
              onClick={() => setIsPaused(!isPaused)}
            >
              {isPaused ? '▶ resume' : '⏸ pause'}
            </Button>
            <Button
              variant="cozy"
              size="lg"
              className="flex-1"
              onClick={() => handleFinish(true)}
            >
              i'm done! ✨
            </Button>
          </div>
          
          <Button
            variant="ghost"
            size="default"
            className="text-muted-foreground"
            onClick={() => handleFinish(false)}
          >
            i need to stop early (that's okay!)
          </Button>
        </div>

        {/* Gentle encouragement */}
        <p className="mt-8 text-sm text-muted-foreground animate-pulse">
          you're doing great just by being here 💛
        </p>
      </div>
    </div>
  );
}
