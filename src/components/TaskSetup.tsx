import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Task } from '@/types/app';
import { cn } from '@/lib/utils';

interface TaskSetupProps {
  mood: string;
  onComplete: (task: Task) => void;
}

const timeOptions = [
  { minutes: 10, label: '10 min', emoji: '🌱' },
  { minutes: 25, label: '25 min', emoji: '🌿' },
  { minutes: 45, label: '45 min', emoji: '🌳' },
];

const taskSuggestions = [
  'read a few pages',
  'reply to that message',
  'tidy one corner',
  'start that assignment',
  'do one small thing',
];

export function TaskSetup({ mood, onComplete }: TaskSetupProps) {
  const [taskTitle, setTaskTitle] = useState('');
  const [duration, setDuration] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const moodMessages: Record<string, string> = {
    great: "love that energy! ✨ what's one small thing you'd like to tackle?",
    okay: "that's totally valid 🌤️ let's pick something gentle",
    meh: "we'll take it easy 🌙 what feels manageable right now?",
    struggling: "i'm here with you 🫂 let's just try one tiny thing together",
  };

  const handleContinue = () => {
    if (!taskTitle.trim() || !duration) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      onComplete({
        id: Date.now().toString(),
        title: taskTitle.trim(),
        duration,
        completed: false,
      });
    }, 500);
  };

  return (
    <div className={cn(
      "flex flex-col items-center justify-center min-h-screen px-6 py-12 transition-opacity duration-500",
      isTransitioning && "opacity-0"
    )}>
      <div className="max-w-md w-full animate-fade-in">
        <p className="text-center text-lg text-muted-foreground mb-8">
          {moodMessages[mood || 'okay']}
        </p>

        {/* Task Input */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-foreground mb-3">
            what's your one thing?
          </label>
          <input
            type="text"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            placeholder="e.g., write for 10 minutes"
            className="w-full px-5 py-4 rounded-2xl bg-card border-2 border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
          />
          
          {/* Suggestions */}
          <div className="flex flex-wrap gap-2 mt-3">
            {taskSuggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => setTaskTitle(suggestion)}
                className="px-3 py-1.5 text-sm rounded-full bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        {/* Duration Selection */}
        <div className="mb-10">
          <label className="block text-sm font-medium text-foreground mb-3">
            how long do you want to try for?
          </label>
          <div className="grid grid-cols-3 gap-3">
            {timeOptions.map((option) => (
              <button
                key={option.minutes}
                onClick={() => setDuration(option.minutes)}
                className={cn(
                  "flex flex-col items-center p-4 rounded-2xl border-2 transition-all duration-300",
                  "hover:scale-[1.02] active:scale-[0.98]",
                  duration === option.minutes
                    ? "border-primary bg-primary/10"
                    : "border-border bg-card hover:border-primary/30"
                )}
              >
                <span className="text-2xl mb-1">{option.emoji}</span>
                <span className="font-medium text-foreground">{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        <Button
          variant="cozy"
          size="lg"
          className="w-full"
          onClick={handleContinue}
          disabled={!taskTitle.trim() || !duration}
        >
          choose someone to be here with me
        </Button>
      </div>
    </div>
  );
}
