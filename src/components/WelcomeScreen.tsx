import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12 cozy-gradient">
      <div className="max-w-md w-full text-center">
        {/* Logo/Icon */}
        <div className="mb-8 animate-fade-in">
          <span className="text-7xl gentle-float inline-block">🤝</span>
        </div>

        {/* Title */}
        <h1 
          className="text-4xl font-bold text-foreground mb-4 animate-slide-up"
          style={{ animationDelay: '100ms' }}
        >
          together
        </h1>
        
        <p 
          className="text-lg text-muted-foreground mb-3 animate-slide-up"
          style={{ animationDelay: '200ms' }}
        >
          productivity that feels like a hug
        </p>

        <p 
          className="text-muted-foreground mb-10 animate-slide-up"
          style={{ animationDelay: '300ms' }}
        >
          do small things with people you love. <br />
          no pressure, no streaks, just presence.
        </p>

        {/* Features */}
        <div 
          className="grid grid-cols-3 gap-4 mb-10 animate-slide-up"
          style={{ animationDelay: '400ms' }}
        >
          {[
            { emoji: '👥', label: 'work with friends' },
            { emoji: '💭', label: 'gentle check-ins' },
            { emoji: '💛', label: 'celebrate trying' },
          ].map((feature) => (
            <div 
              key={feature.label}
              className="p-4 rounded-2xl bg-card/60 border border-border/50"
            >
              <span className="text-2xl block mb-2">{feature.emoji}</span>
              <span className="text-xs text-muted-foreground">{feature.label}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Button
          variant="cozy"
          size="xl"
          className="w-full animate-slide-up"
          style={{ animationDelay: '500ms' }}
          onClick={onStart}
        >
          let's start 💫
        </Button>

        <p 
          className="mt-6 text-sm text-muted-foreground animate-fade-in"
          style={{ animationDelay: '700ms' }}
        >
          you're already doing great by being here ✨
        </p>
      </div>
    </div>
  );
}
