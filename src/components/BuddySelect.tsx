import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Buddy } from '@/types/app';
import { cn } from '@/lib/utils';

interface BuddySelectProps {
  onComplete: (buddy: Buddy | null) => void;
}

const mockBuddies: Buddy[] = [
  { id: '1', name: 'sam', emoji: '🌻', status: 'online' },
  { id: '2', name: 'alex', emoji: '🦋', status: 'focusing' },
  { id: '3', name: 'jordan', emoji: '🌙', status: 'online' },
  { id: '4', name: 'riley', emoji: '☕', status: 'offline' },
];

const statusLabels: Record<string, { text: string; color: string }> = {
  online: { text: 'free to join', color: 'bg-accent text-accent-foreground' },
  focusing: { text: 'in a session', color: 'bg-secondary text-secondary-foreground' },
  offline: { text: 'away', color: 'bg-muted text-muted-foreground' },
};

export function BuddySelect({ onComplete }: BuddySelectProps) {
  const [selected, setSelected] = useState<Buddy | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleContinue = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      onComplete(selected);
    }, 500);
  };

  const handleSolo = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      onComplete(null);
    }, 500);
  };

  return (
    <div className={cn(
      "flex flex-col items-center justify-center min-h-screen px-6 py-12 transition-opacity duration-500",
      isTransitioning && "opacity-0"
    )}>
      <div className="max-w-md w-full animate-fade-in">
        <h2 className="text-2xl font-semibold text-center text-foreground mb-2">
          who do you want here with you? 💫
        </h2>
        <p className="text-center text-muted-foreground mb-8">
          they'll get a gentle invite to work alongside you
        </p>

        <div className="space-y-3 mb-8">
          {mockBuddies.map((buddy, index) => (
            <button
              key={buddy.id}
              onClick={() => setSelected(buddy)}
              className={cn(
                "w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-300",
                "hover:scale-[1.01] active:scale-[0.99]",
                selected?.id === buddy.id
                  ? "border-primary bg-primary/10"
                  : "border-border bg-card hover:border-primary/30",
                "animate-slide-up"
              )}
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="relative">
                <span className="text-3xl">{buddy.emoji}</span>
                {buddy.status === 'online' && (
                  <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-accent rounded-full border-2 border-card soft-pulse" />
                )}
              </div>
              <div className="flex-1 text-left">
                <span className="font-medium text-foreground">{buddy.name}</span>
              </div>
              <span className={cn(
                "text-xs px-3 py-1 rounded-full",
                statusLabels[buddy.status].color
              )}>
                {statusLabels[buddy.status].text}
              </span>
            </button>
          ))}
        </div>

        <div className="space-y-3">
          <Button
            variant="cozy"
            size="lg"
            className="w-full"
            onClick={handleContinue}
            disabled={!selected}
          >
            invite {selected?.name || 'them'} to join ✨
          </Button>
          
          <Button
            variant="soft"
            size="lg"
            className="w-full"
            onClick={handleSolo}
          >
            i'll go solo this time
          </Button>
        </div>
      </div>
    </div>
  );
}
