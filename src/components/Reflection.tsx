import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Task, Buddy, ReflectionChoice } from '@/types/app';
import { cn } from '@/lib/utils';

interface ReflectionProps {
  task: Task;
  buddy: Buddy | null;
  completed: boolean;
  onComplete: (choice: ReflectionChoice | 'done') => void;
}

const reflectionOptions: { value: ReflectionChoice; emoji: string; label: string }[] = [
  { value: 'encouragement', emoji: '💪', label: 'i could use some encouragement' },
  { value: 'space', emoji: '🌙', label: 'just need some space' },
  { value: 'reassurance', emoji: '🫂', label: "tell me it's okay" },
];

export function Reflection({ task, buddy, completed, onComplete }: ReflectionProps) {
  const [showNeedOptions, setShowNeedOptions] = useState(false);

  const completedMessages = [
    "you did it! that's amazing 🎉",
    "look at you, showing up for yourself ✨",
    "proud of you for trying 💛",
  ];

  const incompleteMessages = [
    "hey, you tried. that counts 💛",
    "showing up is the hardest part, and you did that 🌟",
    "no pressure—today was still a win 🫂",
  ];

  const messages = completed ? completedMessages : incompleteMessages;
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12">
      <div className="max-w-md w-full text-center animate-fade-in">
        {/* Celebration or comfort */}
        <div className="mb-8">
          <span className="text-6xl gentle-float inline-block mb-4">
            {completed ? '🌈' : '🌸'}
          </span>
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            {randomMessage}
          </h2>
          <p className="text-muted-foreground">
            {completed 
              ? `you spent time on "${task.title}" and that's something`
              : `you started "${task.title}" and that takes courage`
            }
          </p>
        </div>

        {/* Buddy acknowledgment */}
        {buddy && (
          <div className="mb-8 p-4 rounded-2xl bg-secondary/30 border border-secondary animate-slide-up">
            <p className="text-secondary-foreground">
              <span className="text-xl mr-2">{buddy.emoji}</span>
              {buddy.name} was here with you—maybe send them a little thanks? 💜
            </p>
          </div>
        )}

        {/* Needs check-in for incomplete tasks */}
        {!completed && !showNeedOptions && (
          <div className="mb-8 animate-slide-up" style={{ animationDelay: '200ms' }}>
            <p className="text-muted-foreground mb-4">
              do you need anything right now?
            </p>
            <div className="flex gap-3 justify-center">
              <Button
                variant="gentle"
                onClick={() => setShowNeedOptions(true)}
              >
                yeah, actually
              </Button>
              <Button
                variant="soft"
                onClick={() => onComplete('done')}
              >
                i'm good 💛
              </Button>
            </div>
          </div>
        )}

        {/* Needs options */}
        {!completed && showNeedOptions && (
          <div className="space-y-3 mb-8 animate-fade-in">
            {reflectionOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onComplete(option.value)}
                className="w-full flex items-center gap-3 p-4 rounded-2xl border-2 border-border bg-card hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 hover:scale-[1.01]"
              >
                <span className="text-2xl">{option.emoji}</span>
                <span className="text-foreground">{option.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Done button */}
        {(completed || showNeedOptions) && (
          <Button
            variant="cozy"
            size="lg"
            className="w-full animate-slide-up"
            style={{ animationDelay: '300ms' }}
            onClick={() => onComplete('done')}
          >
            {completed ? 'back to home 🏠' : 'thanks, i feel better 💛'}
          </Button>
        )}
      </div>
    </div>
  );
}
