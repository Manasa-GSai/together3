import { useState } from 'react';
import { Mood } from '@/types/app';
import { cn } from '@/lib/utils';

interface MoodCheckInProps {
  onComplete: (mood: Mood) => void;
}

const moods: { value: Mood; emoji: string; label: string; subtext: string }[] = [
  { value: 'great', emoji: '✨', label: 'feeling good', subtext: 'ready to focus' },
  { value: 'okay', emoji: '🌤️', label: 'doing okay', subtext: 'could use company' },
  { value: 'meh', emoji: '🌙', label: 'kinda meh', subtext: 'low energy today' },
  { value: 'struggling', emoji: '🫂', label: 'struggling', subtext: 'need gentle support' },
];

export function MoodCheckIn({ onComplete }: MoodCheckInProps) {
  const [selected, setSelected] = useState<Mood>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleSelect = (mood: Mood) => {
    setSelected(mood);
    setIsTransitioning(true);
    setTimeout(() => {
      onComplete(mood);
    }, 600);
  };

  return (
    <div className={cn(
      "flex flex-col items-center justify-center min-h-screen px-6 py-12 transition-opacity duration-500",
      isTransitioning && "opacity-0"
    )}>
      <div className="max-w-md w-full text-center animate-fade-in">
        <h1 className="text-3xl font-semibold text-foreground mb-3">
          hey, how are you feeling? 💭
        </h1>
        <p className="text-muted-foreground mb-10">
          no pressure—just checking in before we start
        </p>

        <div className="grid grid-cols-2 gap-4">
          {moods.map((mood, index) => (
            <button
              key={mood.value}
              onClick={() => handleSelect(mood.value)}
              className={cn(
                "group relative flex flex-col items-center p-6 rounded-3xl border-2 transition-all duration-300",
                "hover:scale-[1.03] active:scale-[0.98]",
                "bg-card border-border hover:border-primary/40",
                selected === mood.value && "border-primary bg-primary/10 scale-[1.03]",
                "animate-slide-up"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {mood.emoji}
              </span>
              <span className="font-medium text-foreground">{mood.label}</span>
              <span className="text-sm text-muted-foreground mt-1">{mood.subtext}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
